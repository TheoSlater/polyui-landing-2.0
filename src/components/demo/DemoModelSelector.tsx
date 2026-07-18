import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MODELS = [
  { name: "GPT 5.6-Sol", meta: "External · OpenAI-compatible" },
  { name: "GPT 5.6 Terra", meta: "External · OpenAI-compatible" },
  { name: "GPT 5.6 Luna", meta: "External · OpenAI-compatible" },
];

export function DemoModelSelector() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(MODELS[0].name);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-7 items-center gap-1 text-left text-sm font-medium text-foreground transition-colors hover:text-foreground/80"
      >
        <span className="max-w-36 truncate sm:max-w-none">{model}</span>
        <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close model menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            className="absolute left-0 top-8 z-20 w-60 rounded-xl border border-border bg-popover p-1 shadow-lg"
          >
            {MODELS.map((item) => (
              <button
                key={item.name}
                type="button"
                role="option"
                aria-selected={item.name === model}
                onClick={() => {
                  setModel(item.name);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm",
                  "hover:bg-foreground/[0.06]",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.meta}</span>
                </span>
                {item.name === model && <Check size={14} className="shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
