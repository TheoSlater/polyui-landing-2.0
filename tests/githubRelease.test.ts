import { describe, expect, test } from "bun:test";
import {
  detectPlatform,
  formatBytes,
  pickDownload,
  type GithubRelease,
} from "../src/lib/githubRelease";

const release: GithubRelease = {
  tag_name: "v0.20.11",
  html_url: "https://github.com/monolabsdev/poly-ui/releases/tag/v0.20.11",
  assets: [
    asset("PolyUI-0.20.11-linux-arm64.AppImage", 99_105_288),
    asset("PolyUI-0.20.11-linux-x64.AppImage", 100_940_280),
    asset("PolyUI-0.20.11-macos-universal.dmg", 25_834_572),
    asset("PolyUI-0.20.11-windows-x64-ollama-setup.exe", 12_933_871),
    asset("PolyUI-0.20.11-windows-x64-setup.exe", 16_635_583),
  ],
};

describe("detectPlatform", () => {
  test("detects desktop operating systems", () => {
    expect(detectPlatform({ platform: "Win32", userAgent: "" })).toBe("windows");
    expect(detectPlatform({ platform: "MacIntel", userAgent: "" })).toBe("macos");
    expect(detectPlatform({ platform: "Linux x86_64", userAgent: "" })).toBe("linux");
  });

  test("prefers client hints and rejects mobile platforms", () => {
    expect(
      detectPlatform({
        platform: "",
        userAgent: "",
        userAgentDataPlatform: "Windows",
      }),
    ).toBe("windows");
    expect(detectPlatform({ platform: "Linux armv8l", userAgent: "Android" })).toBe(
      "unsupported",
    );
    expect(
      detectPlatform({
        platform: "MacIntel",
        userAgent: "Mozilla/5.0",
        maxTouchPoints: 5,
      }),
    ).toBe("unsupported");
  });
});

describe("pickDownload", () => {
  test("selects the preferred installer for each desktop OS", () => {
    expect(pickDownload(release, "macos")?.asset.name).toEndWith(".dmg");
    expect(pickDownload(release, "linux")?.asset.name).toEndWith("linux-x64.AppImage");
    expect(pickDownload(release, "windows")?.asset.name).toEndWith(
      "windows-x64-setup.exe",
    );
    expect(pickDownload(release, "windows")?.asset.name).not.toContain("ollama");
  });

  test("returns no target for unknown, mobile, or missing assets", () => {
    expect(pickDownload(release, "unknown")).toBeNull();
    expect(pickDownload(release, "unsupported")).toBeNull();
    expect(pickDownload({ ...release, assets: [] }, "linux")).toBeNull();
  });
});

test("formats binary file sizes", () => {
  expect(formatBytes(100_940_280)).toBe("96.3 MB");
  expect(formatBytes(25_834_572)).toBe("24.6 MB");
});

function asset(name: string, size: number) {
  return {
    name,
    size,
    browser_download_url: `https://example.com/${name}`,
  };
}
