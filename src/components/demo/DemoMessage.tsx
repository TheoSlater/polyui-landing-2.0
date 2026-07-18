export function DemoUserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-muted/70 px-3 py-2">
      <p className="text-sm leading-6 whitespace-pre-wrap">{children}</p>
    </div>
  );
}

export function DemoAssistantParagraph({ children }: { children: React.ReactNode }) {
  return <p className="pb-2 text-sm leading-6 text-foreground/90">{children}</p>;
}
