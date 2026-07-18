import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  detectPlatform,
  formatBytes,
  pickDownload,
  type GithubRelease,
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
  const [release, setRelease] = useState<GithubRelease | null>(null);
  const [failed, setFailed] = useState(false);

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

  const target = release ? pickDownload(release, platform) : null;

  if (release && target) {
    return (
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Latest desktop release</p>
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
    );
  }

  if (failed || (release && !target)) {
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
    <div
      aria-live="polite"
      className="flex min-h-20 flex-col gap-3 sm:justify-center"
    >
      <p className="text-xs text-muted-foreground">Desktop releases</p>
      <p className="font-heading text-xl font-medium tracking-[-0.035em]">
        Finding the latest download for your system…
      </p>
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
