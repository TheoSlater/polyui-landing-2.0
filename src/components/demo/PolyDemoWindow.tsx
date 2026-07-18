import { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { DemoSidebar } from "./DemoSidebar";
import { DemoConversation } from "./DemoConversation";
import { DemoBrowserViewport } from "./DemoBrowserViewport";

/** The interactive product demo: desktop window frame, shown mid-conversation. */
export function PolyDemoWindow() {
  // Drawer starts open only where it can sit beside the chat (lg+); on
  // smaller screens it is an overlay, so start closed
  const [viewportOpen, setViewportOpen] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  return (
    <div className="demo-entrance overflow-hidden rounded-xl border border-border/80 bg-sidebar shadow-[0_24px_80px_-24px_rgb(0_0_0/0.8)]">
      <div className="demo-entrance-content">
        {/* Title bar with the app's Windows/Linux window controls */}
        <div className="demo-reveal-title flex h-9 items-center bg-sidebar pl-3 pr-2">
        <span className="hidden text-sm font-bold xl:block xl:flex-1">PolyUI</span>
        <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
          <span className="flex size-7 items-center justify-center rounded-lg">
            <Minus size={15} strokeWidth={1.5} />
          </span>
          <span className="flex size-7 items-center justify-center rounded-lg">
            <Square size={13} strokeWidth={1.5} />
          </span>
          <span className="flex size-7 items-center justify-center rounded-lg">
            <X size={15} strokeWidth={1.5} />
          </span>
        </span>
        </div>

        <div className="relative flex h-[520px] min-h-0 sm:h-[560px] lg:h-[600px]">
          <DemoSidebar />
          <div className="relative flex min-w-0 flex-1 overflow-hidden rounded-tl-lg border-l border-t border-border/30 max-md:rounded-tl-none max-md:border-l-0">
            <DemoConversation
              viewportOpen={viewportOpen}
              onOpenViewport={() => setViewportOpen(true)}
            />
            <DemoBrowserViewport open={viewportOpen} onClose={() => setViewportOpen(false)} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="demo-chat-glint" />
    </div>
  );
}
