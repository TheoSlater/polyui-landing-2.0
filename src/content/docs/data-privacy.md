Poly UI is designed to keep app data and provider credentials on your device while making network boundaries visible.

## What stays local

- Conversations and messages are stored in the local SQLite database.
- Provider credentials are stored in the operating system credential store.
- The frontend works with connection IDs and does not keep provider secrets in browser storage.
- The Rust host coordinates local storage, credential access, and the sidecar lifecycle.

## What can leave the device

Poly UI sends a request to the service you configure when you use:

- A hosted model provider.
- A custom endpoint or gateway.
- Web search.
- A network-backed memory provider.
- A coding agent that makes its own provider requests.

Files are included only when you attach them or give a model access to an approved workspace. Review the provider's own data policy for how it handles requests after Poly UI sends them.

## Runtime boundary

The sidecar owns AI SDK generation, streaming, provider normalization, tools, and coding-agent protocol handling. It communicates with the Rust host through JSONL over standard input and output. It does not expose a local HTTP server.

> [!IMPORTANT]
> Local app storage does not make a hosted request local. If a cloud provider, search service, or remote memory provider is enabled, that service receives the data needed for the request.

## Clear data

Use the data controls in Settings when you need to remove conversations or memory. If you need to rotate a provider key, update the connection and save the new credential through Settings.

