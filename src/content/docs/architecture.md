Poly UI keeps the UI, native host, and AI runtime separate so each layer owns the work it can validate.

## Request flow

~~~text
React UI
  -> @ai-sdk/react useChat
  -> TauriChatTransport
  -> Rust authorization, keychain, and supervisor
  -> private JSONL stdin/stdout
  -> Bun sidecar
  -> Vercel AI SDK provider, tools, or local Claude Code/Codex
~~~

## Layer responsibilities

### React

The interface owns user intent, conversation presentation, settings, model selection, and request-scoped UI state. `src/lib/ai/messages.ts` is the message mapping boundary.

### Rust

The Rust host owns Tauri lifecycle, SQLite coordination, operating system keychain access, mobile framing, and sidecar process cleanup. It does not construct provider requests or accumulate streamed tokens.

### Bun sidecar

The sidecar owns provider creation, model discovery, AI SDK streaming, tool loops, web search, and coding-agent protocol handling. Its request dispatcher is strict and request-scoped.

## State boundaries

Connection rows contain provider metadata and keychain references, never raw credentials. The frontend passes connection IDs. The host resolves secrets for the sidecar request and keeps the secret out of conversation state.

Requests use one `requestId` per isolated stream. Multi-model chat starts independent requests, then the UI maps each response back to its conversation turn.

## Before you change a flow

Trace the path from the component or store to the sidecar protocol and the Rust command. Search every caller of a shared seam before adding a local guard. Add the smallest test that would fail if the boundary regresses.
