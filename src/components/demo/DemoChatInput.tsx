import { ArrowUp, Globe, Mic, MoreHorizontal, Plus } from "lucide-react";

const iconButton =
  "flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground sm:size-9";

/** Static default-chat composer matching the app's ChatInput. Display only. */
export function DemoChatInput() {
  return (
    <div aria-hidden="true" className="pointer-events-none w-full select-none rounded-3xl border border-transparent bg-popover px-4 py-3 shadow-sm">
      <p className="min-h-8 pt-1 text-sm leading-6 text-muted-foreground">
        How can I help you today?
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={iconButton}>
            <Plus size={18} />
          </span>
          {/* Web search enabled, matching the app's active feature pill */}
          <span className="hidden h-8 items-center gap-1.5 rounded-full bg-info-soft px-3 text-sm text-info sm:inline-flex sm:h-9">
            <Globe size={16} />
            Search
          </span>
          <span className={iconButton}>
            <MoreHorizontal size={18} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${iconButton} hidden sm:flex`}>
            <Mic size={18} />
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-9">
            <ArrowUp size={18} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}
