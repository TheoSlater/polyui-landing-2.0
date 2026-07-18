import { ArrowLeft, ArrowRight, Globe, RotateCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Right-hand viewport drawer matching the app's AgentViewportDrawer,
 * open on the new-tab empty state. Below lg it overlays the conversation.
 */
export function DemoBrowserViewport({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      aria-label="Viewport drawer"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "demo-reveal-viewport flex min-h-0 flex-col overflow-hidden border-border bg-sidebar transition-[width,opacity] duration-300",
        "max-lg:absolute max-lg:inset-0 max-lg:z-10 max-lg:transition-[opacity,transform]",
        open
          ? "border-l max-lg:opacity-100 lg:w-[42%]"
          : "pointer-events-none max-lg:translate-y-2 max-lg:opacity-0 lg:w-0 lg:opacity-0",
      )}
    >
      <header className="flex h-11 shrink-0 items-center gap-2 border-b border-sidebar-border px-3">
        <span className="flex h-7 min-w-0 items-center gap-1.5 rounded-lg bg-sidebar-accent px-2.5 text-xs text-sidebar-foreground">
          <Globe size={13} className="shrink-0 text-muted-foreground" />
          <span className="truncate">New tab</span>
        </span>
        <button
          type="button"
          aria-label="Close viewport"
          onClick={onClose}
          className="relative ml-auto flex size-7 items-center justify-center rounded-lg text-muted-foreground after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-foreground"
        >
          <X size={15} />
        </button>
      </header>

      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-sidebar-border px-3">
        <span className="flex items-center gap-0.5 text-muted-foreground/60">
          <ArrowLeft size={15} />
          <ArrowRight size={15} />
          <RotateCw size={13} className="ml-1" />
        </span>
        <span className="flex h-7 min-w-0 flex-1 items-center justify-center rounded-full text-xs text-muted-foreground">
          Enter a URL
        </span>
        <span className="w-6" />
      </div>

      {/* The app's BrowserNewTabEmpty state */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-6 text-center">
        <div className="-mt-10 flex flex-col items-center">
          <Globe className="mb-6 size-16 text-muted-foreground sm:mb-8 sm:size-20" strokeWidth={1.7} />
          <div className="text-lg font-medium text-foreground">Start browsing</div>
          <div className="mt-3 text-base text-muted-foreground">
            Enter a URL or search with Google
          </div>
        </div>
      </div>
    </aside>
  );
}
