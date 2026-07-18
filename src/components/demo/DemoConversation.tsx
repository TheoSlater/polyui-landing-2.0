import { PanelRight } from "lucide-react";
import { DemoModelSelector } from "./DemoModelSelector";
import { DemoUserMessage, DemoAssistantParagraph } from "./DemoMessage";
import { DemoChatInput } from "./DemoChatInput";

export function DemoConversation({
  viewportOpen,
  onOpenViewport,
}: {
  viewportOpen: boolean;
  onOpenViewport: () => void;
}) {
  return (
    <section className="demo-reveal-conversation relative flex min-w-0 flex-1 flex-col bg-chat-panel">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border/40 px-4">
        <DemoModelSelector />
        {!viewportOpen && (
          <button
            type="button"
            aria-label="Open viewport drawer"
            onClick={onOpenViewport}
            className="relative ml-auto flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors after:absolute after:-inset-2 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <PanelRight size={15} />
          </button>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-4 sm:px-6">
        <DemoUserMessage>
          Why does my flex sidebar overflow on narrow screens?
        </DemoUserMessage>

        <div>
          <DemoAssistantParagraph>
            Flex items default to min-width: auto, so the sidebar can never shrink
            below the width of its content.
          </DemoAssistantParagraph>
          <DemoAssistantParagraph>
            Set min-width: 0 on it and it will compress with the layout instead of
            overflowing the page.
          </DemoAssistantParagraph>
        </div>
      </div>

      <div className="shrink-0 px-3 pb-3 sm:px-5 sm:pb-4">
        <DemoChatInput />
      </div>
    </section>
  );
}
