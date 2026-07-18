# Recommended install command

## Goal

Make the official README install script the recommended path while retaining direct GitHub release assets as a secondary choice.

## Behavior

- Keep existing client-side OS detection and latest-release fetch.
- On Linux and macOS, show the official shell command:
  `curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh`
- On Windows, show the official PowerShell command:
  `irm https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.ps1 | iex`
- Label the command path `Recommended` and provide an accessible copy button with brief `Copied` feedback.
- On Linux only, show a two-option installer selector below the command:
  - `Ubuntu / Debian` selects the latest x64 `.deb` asset.
  - `Other distro` selects the latest x64 `.AppImage` asset.
- Default Linux direct installer to `Ubuntu / Debian`; command remains the primary recommendation for every Linux distro.
- Keep `All installers` for RPM, ARM64, MSI, Ollama, and other variants.
- macOS keeps DMG as its secondary direct installer; Windows keeps the non-Ollama setup EXE.
- Mobile, unknown-OS, API failure, clipboard failure, and missing-asset states must keep a working GitHub release fallback.

## Visual treatment

Use one full-width command line with a quiet `Recommended` label, monospace command text, and compact copy control. Put Linux distro options in a restrained two-item segmented control, followed by the direct-download metadata and CTA. No modal, nested card, glow, gradient, or new section.

## Testing

Unit-test Linux DEB/AppImage asset selection and OS-specific command selection. Source-test copy behavior, recommended label, distro controls, clipboard error handling, and preservation of the GitHub fallback.
