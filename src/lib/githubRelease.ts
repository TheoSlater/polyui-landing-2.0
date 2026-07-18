export type Platform = "macos" | "windows" | "linux" | "unsupported" | "unknown";
export type LinuxPackage = "deb" | "appimage";

export type NavigatorData = {
  platform: string;
  userAgent: string;
  userAgentDataPlatform?: string;
  maxTouchPoints?: number;
};

export type GithubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

export type GithubRelease = {
  tag_name: string;
  html_url: string;
  assets: GithubAsset[];
};

export type DownloadTarget = {
  asset: GithubAsset;
  label: "Linux" | "macOS" | "Windows";
  format: "AppImage" | "DEB" | "DMG" | "EXE";
};

const UNIX_INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.sh | sh";
const WINDOWS_INSTALL_COMMAND =
  "irm https://raw.githubusercontent.com/monolabsdev/poly-ui/main/scripts/install.ps1 | iex";

export function detectPlatform(data: NavigatorData): Platform {
  const platform = data.platform.toLowerCase();
  const signal = `${data.userAgentDataPlatform ?? ""} ${data.platform} ${data.userAgent}`.toLowerCase();

  if (
    /android|iphone|ipad|ipod/.test(signal) ||
    (platform === "macintel" && (data.maxTouchPoints ?? 0) > 1)
  ) {
    return "unsupported";
  }
  if (signal.includes("win")) return "windows";
  if (signal.includes("mac")) return "macos";
  if (signal.includes("linux") || signal.includes("x11")) return "linux";
  return "unknown";
}

export function pickDownload(
  release: GithubRelease,
  platform: Platform,
  linuxPackage: LinuxPackage = "deb",
): DownloadTarget | null {
  const choices = {
    macos: { match: "macos-universal.dmg", label: "macOS", format: "DMG" },
    windows: { match: "windows-x64-setup.exe", label: "Windows", format: "EXE" },
    linux:
      linuxPackage === "deb"
        ? ({ match: "linux-x64.deb", label: "Linux", format: "DEB" } as const)
        : ({
            match: "linux-x64.appimage",
            label: "Linux",
            format: "AppImage",
          } as const),
  } as const;

  if (platform === "unsupported" || platform === "unknown") return null;

  const choice = choices[platform];
  const asset = release.assets.find((candidate) =>
    candidate.name.toLowerCase().endsWith(choice.match),
  );

  return asset ? { asset, label: choice.label, format: choice.format } : null;
}

export function installCommand(platform: Platform): string | null {
  if (platform === "windows") return WINDOWS_INSTALL_COMMAND;
  if (platform === "linux" || platform === "macos") return UNIX_INSTALL_COMMAND;
  return null;
}

export function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
