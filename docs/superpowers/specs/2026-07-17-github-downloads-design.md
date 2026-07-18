# GitHub release downloads

## Design read

Dark desktop-software landing for technical users, using a restrained Linear-clean language. Design variance 5, motion 3, visual density 3.

## Behavior

- Fetch the latest public release from `https://api.github.com/repos/monolabsdev/poly-ui/releases/latest` in the browser.
- Detect Windows, macOS, or Linux from User-Agent Client Hints when available, with `navigator.platform` and `navigator.userAgent` fallback.
- Treat Android, iOS, and iPadOS as unsupported desktop platforms.
- Select these primary assets by filename:
  - macOS: `macos-universal.dmg`
  - Windows: `windows-x64-setup.exe`, excluding the Ollama installer
  - Linux: `linux-x64.AppImage`
- Show `Download for macOS`, `Download for Windows`, or `Download for Linux` when a matching asset exists.
- Show version, installer format, and formatted file size beside the CTA.
- Keep an `All installers` link to the latest GitHub release for ARM Linux, DEB, RPM, MSI, and alternate installers.
- On API, detection, or matching failure, link to the latest GitHub release instead of disabling the control.

## Visual treatment

Replace the muted disabled row with a full-width editorial download rail inside the existing open-source close. Keep existing monochrome palette, hairline separators, typography, radius system, and scroll reveal. Use one high-contrast primary download button, a quiet metadata line, and no new card container, gradients, glow, or decorative motion.

## Testing

Unit-test platform detection, asset selection, mobile fallback, and byte formatting. Source-test the GitHub endpoint, loading/error fallback, CTA copy, and integration into the narrative section.
