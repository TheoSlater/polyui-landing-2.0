Poly UI treats model access as a choice, not a hidden default. Set the lowest level that lets you finish the task, then raise it only when you need more.

## Access levels

### Chat only

The model can respond to the conversation. It cannot read workspace files or run commands.

### Workspace access

The model can read and edit files inside folders you approve. The folder boundary remains part of the request context.

### Agent tools

The model can use the sandboxed terminal for multi-step work. Terminal calls are visible in the conversation and follow the app's approval policy.

## Approve a workspace

When a task needs files, choose a workspace folder through the app. Do not paste a broad system directory when a project folder is enough.

## Terminal behavior

Poly UI starts the terminal in an isolated disposable workspace. Commands are controlled by the host policy, and dangerous operations require approval when the tool is configured for approval.

> [!WARNING]
> Treat agent output as work performed by a tool. Review file changes and command results before using them in a release, migration, or production environment.

## Change the setting later

Open Settings and update the model access setting. The choice applies to future work and does not rewrite previous conversation records.

