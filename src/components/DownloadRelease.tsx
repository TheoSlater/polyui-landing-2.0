import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  detectPlatform,
  formatBytes,
  installCommand,
  pickDownload,
  type GithubRelease,
  type LinuxPackage,
  type Platform,
} from "@/lib/githubRelease";

const GITHUB_RELEASE_API =
  "https://api.github.com/repos/monolabsdev/poly-ui/releases/latest";
const LATEST_RELEASE_URL =
  "https://github.com/monolabsdev/poly-ui/releases/latest";

type NavigatorWithUAData = Navigator & {
  userAgentData?: { platform?: string };
};

export function DownloadRelease() {
  const [platform] = useState<Platform>(detectCurrentPlatform);
  const [linuxPackage, setLinuxPackage] = useState<LinuxPackage>("deb");
  const [release, setRelease] = useState<GithubRelease | null>(null);
  const [failed, setFailed] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const copyResetTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (copyResetTimer.current !== undefined) {
        window.clearTimeout(copyResetTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (platform === "unsupported" || platform === "unknown") {
      setFailed(true);
      return;
    }

    const controller = new AbortController();

    fetch(GITHUB_RELEASE_API, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        const data = (await response.json()) as GithubRelease;
        if (!data.tag_name || !data.html_url || !Array.isArray(data.assets)) {
          throw new Error("GitHub release response is incomplete");
        }
        setRelease(data);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, [platform]);

  const command = installCommand(platform);
  const target = release
    ? pickDownload(release, platform, linuxPackage)
    : null;

  async function copyCommand() {
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopyState("copied");
      if (copyResetTimer.current !== undefined) {
        window.clearTimeout(copyResetTimer.current);
      }
      copyResetTimer.current = window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("failed");
    }
  }

  if (!command) {
    return (
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Desktop releases</p>
          <h3 className="mt-2 font-heading text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
            Poly UI for macOS, Windows, and Linux.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose the installer that fits your system on GitHub.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          render={
            <a
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          nativeButton={false}
        >
          View latest release
          <ArrowUpRight data-icon="inline-end" size={14} />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-foreground">Recommended</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Install from your terminal
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCommand}
            aria-live="polite"
          >
            {copyState === "copied" ? (
              <Check data-icon="inline-start" size={14} />
            ) : (
              <Copy data-icon="inline-start" size={14} />
            )}
            {copyState === "copied"
              ? "Copied"
              : copyState === "failed"
                ? "Copy failed"
                : "Copy command"}
          </Button>
        </div>
        <div className="mt-4 overflow-x-auto border-y border-border/70 py-4">
          <code className="select-all whitespace-nowrap font-mono text-xs text-foreground/85 sm:text-sm">
            {command}
          </code>
        </div>
        {copyState === "failed" ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Select the command above and copy it manually.
          </p>
        ) : null}
      </div>

      {platform === "linux" ? (
        <div>
          <p className="text-xs text-muted-foreground">
            Prefer a direct Linux package?
          </p>
          <div
            role="group"
            aria-label="Linux distribution"
            className="mt-3 inline-flex rounded-xl border border-border/70 p-1"
          >
            <Button
              variant={linuxPackage === "deb" ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={linuxPackage === "deb"}
              onClick={() => setLinuxPackage("deb")}
            >
              Ubuntu / Debian
            </Button>
            <Button
              variant={linuxPackage === "appimage" ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={linuxPackage === "appimage"}
              onClick={() => setLinuxPackage("appimage")}
            >
              Other distro
            </Button>
          </div>
        </div>
      ) : null}

      {release && target ? (
        <div className="flex flex-col gap-8 border-t border-border/50 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Direct installer</p>
            <h3 className="mt-2 font-heading text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Download for {target.label}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {release.tag_name} <span aria-hidden="true">·</span> {target.format}{" "}
              <span aria-hidden="true">·</span> {formatBytes(target.asset.size)}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Button
              size="lg"
              render={<a href={target.asset.browser_download_url} />}
              nativeButton={false}
            >
              <Download data-icon="inline-start" size={15} />
              Download for {target.label}
            </Button>
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground"
            >
              All installers
            </a>
          </div>
        </div>
      ) : failed || (release && !target) ? (
        <div className="flex flex-col gap-6 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Need an installer instead? Choose one from the latest GitHub release.
          </p>
          <Button
            variant="outline"
            render={
              <a
                href={LATEST_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            View latest release
            <ArrowUpRight data-icon="inline-end" size={14} />
          </Button>
        </div>
      ) : (
        <p
          aria-live="polite"
          className="border-t border-border/50 pt-8 text-sm text-muted-foreground"
        >
          Finding the latest direct installer…
        </p>
      )}
    </div>
  );
}

function detectCurrentPlatform(): Platform {
  const currentNavigator = navigator as NavigatorWithUAData;
  return detectPlatform({
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    userAgentDataPlatform: currentNavigator.userAgentData?.platform,
    maxTouchPoints: navigator.maxTouchPoints,
  });
}
