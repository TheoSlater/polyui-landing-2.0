Poly UI crosses three runtime layers, so a green frontend build is only one part of a safe change.

## Run the checks

~~~bash
bun run test
bun run sidecar:typecheck
bun run sidecar:test
~~~

For a frontend-only change, run the focused test file first, then the full suite before opening a pull request.

## Build a release

~~~bash
bun run tauri build
~~~

The build packages the React interface, Rust host, and target-specific sidecar. On Windows, make sure the sidecar build has produced the file expected by `externalBin` before starting Tauri.

## Installers

Release assets are published through GitHub Releases. The installer scripts detect the operating system and architecture and download the matching asset.

~~~bash
bun run ollama-setup
~~~

Use the Ollama setup build only when the Windows installer should include the Ollama setup behavior.

## Pull requests

Keep changes focused. Update relevant tests, verify the affected frontend, Rust, and sidecar layers, and call out user-visible behavior or security implications in the pull request.

> [!TIP]
> Documentation changes should include the exact setting name, command, or status message a user will see. That keeps the docs useful when the product changes.
