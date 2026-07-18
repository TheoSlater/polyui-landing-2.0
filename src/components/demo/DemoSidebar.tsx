import { Search, Settings2, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";

const CONVERSATIONS = [
  { title: "Fix sidebar spacing", active: true },
  { title: "Refactor stream client", active: false },
  { title: "Explain oklch colors", active: false },
  { title: "Draft release notes", active: false },
];

/**
 * App sidebar. Icon rail below xl, expanded list at xl+ (mirrors the
 * desktop app's collapsible sidebar without the interaction).
 */
export function DemoSidebar() {
  return (
    <aside aria-hidden="true" className="demo-reveal-sidebar flex h-full w-11 shrink-0 flex-col bg-sidebar px-1.5 py-2 max-md:hidden xl:w-52 xl:px-2">
      <SidebarItem icon={<SquarePen size={16} />} label="New Chat" />
      <SidebarItem icon={<Search size={16} />} label="Search" />

      <div className="mt-4 hidden min-h-0 flex-1 flex-col xl:flex">
        <p className="px-2 pb-1 text-[11px] font-medium text-muted-foreground/70">Today</p>
        {CONVERSATIONS.map((conversation) => (
          <div
            key={conversation.title}
            className={cn(
              "truncate rounded-lg px-2 py-1.5 text-left text-[13px] text-sidebar-foreground/90",
              conversation.active && "bg-sidebar-accent",
            )}
          >
            {conversation.title}
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 pt-2">
        <SidebarItem icon={<Settings2 size={16} />} label="Settings" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-sidebar-foreground/90 max-xl:justify-center max-xl:px-0"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="hidden xl:inline">{label}</span>
    </div>
  );
}
