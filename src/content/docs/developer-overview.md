Poly UI is a React and Tauri desktop app with a Rust host and a private Bun sidecar. The codebase keeps provider requests, credentials, persistence, and UI state behind explicit seams.

## Find the right layer

| Need | Start here |
| --- | --- |
| Add or change a provider | `sidecar/src/providers.ts` and `sidecar/src/protocol.ts` |
| Change request execution | `sidecar/src/runtime.ts` and `src/lib/ai/transport.ts` |
| Change connection persistence | `src/features/connections/` and `src-tauri/src/connections/` |
| Change settings or onboarding | `src/features/settings/` and `src/features/onboarding/` |
| Add a full content view | `src/lib/view-registry.ts` and [Custom views](#/docs/custom-views) |
| Change the terminal boundary | `src-tauri/src/pty.rs` and `src-tauri/src/sandbox.rs` |

## Repository shape

~~~text
src/                 React interface, stores, features, and view wiring
sidecar/src/         Bun runtime, providers, tools, and agent protocols
src-tauri/src/       Rust lifecycle, SQLite, keychain, sandbox, and commands
tests/               Frontend, sidecar, and integration-focused tests
scripts/             Build, install, and release helpers
docs/                Project guides and design records
~~~

## Rules worth keeping

- SQLite is the source of truth for conversations.
- Provider secrets stay in the operating system keychain.
- Zustand stores do not import each other. Cross-store effects go through coordinators or action boundaries.
- Coding agents start read-only. Workspace writes and command execution require explicit access.
- Keep changes focused and update the affected tests.

Read [Architecture](#/docs/architecture) before changing a request path.
