## Requirements

- Git
- [Bun 1.3.14](https://bun.sh/)
- The Rust toolchain
- [Tauri 2 system prerequisites](https://v2.tauri.app/start/prerequisites/) for your operating system

## Clone and install

~~~bash
git clone https://github.com/monolabsdev/poly-ui.git
cd poly-ui

bun install
~~~

## Build the sidecar

The desktop app expects a target-suffixed sidecar executable in `src-tauri/binaries`.

~~~bash
bun run sidecar:build
~~~

Run this again when the sidecar source changes or when a clean checkout is missing the binary.

## Run the app

~~~bash
bun run tauri dev
~~~

The Tauri host starts the React frontend, Rust services, and private Bun sidecar together.

## Useful checks

~~~bash
bun run test
bun run sidecar:typecheck
bun run sidecar:test
bun run tauri build
~~~

> [!NOTE]
> If a running app holds the normal Cargo target directory on Windows, use an isolated target directory for checks instead of stopping the user's process.
