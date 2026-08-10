## Download a release

Open the [latest GitHub release](https://github.com/monolabsdev/poly-ui/releases/latest) and choose the package for your operating system and architecture.

| Platform | Package |
| --- | --- |
| macOS | Apple Silicon `.dmg` |
| Windows | x64 setup `.exe` or `.msi` |
| Debian and Ubuntu | x64 or arm64 `.deb` |
| Fedora, RHEL, and openSUSE | x64 or arm64 `.rpm` |

Use `x64` for most Intel and AMD computers. Use `arm64` for Apple Silicon Macs and ARM Linux devices.

> [!NOTE]
> AppImage packages are temporarily unavailable. Use the `.deb` or `.rpm` package on Linux.

## Install from a terminal

On Linux or macOS:

~~~bash
curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh
~~~

On Windows PowerShell:

~~~powershell
irm https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.ps1 | iex
~~~

The scripts detect your operating system and architecture, download the matching GitHub release, and run the installer.

## Optional local models

Ollama is optional. Install it only when you want to run local Ollama models. You can also connect an existing LM Studio server from [Providers](#/docs/providers).

## Build from source

You need Git, [Bun 1.3.14](https://bun.sh/), the Rust toolchain, and the [Tauri 2 system prerequisites](https://v2.tauri.app/start/prerequisites/) for your operating system.

~~~bash
git clone https://github.com/monolabsdev/poly-ui.git
cd poly-ui

bun install
bun run sidecar:build
bun run tauri dev
~~~

After the app opens, continue with [First run](#/docs/first-run).
