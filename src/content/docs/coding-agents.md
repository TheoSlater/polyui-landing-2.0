Poly UI can use Claude Code and Codex as local coding agents. The app uses the CLI installation and sign-in you already have instead of creating a second account.

## Before you start

Install and sign in to the agent CLI using its own instructions:

- [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Codex CLI documentation](https://github.com/openai/codex)

Then open Poly UI and let the provider catalog check the installed agents.

## Connect an agent

1. Open **Settings > Connections**.
2. Find Claude Code or Codex.
3. Select **Check again** if the first check ran before the CLI was installed.
4. Start a chat and choose the agent from the model picker.

Poly UI keeps Claude Code and Codex separate from direct API connections. Agent rows appear when the local CLI is installed and authenticated.

## Access and approvals

Agent sessions start read-only. Workspace edits and terminal execution require the access mode and approvals described in [Workspace access and sandbox](#/docs/workspace-access).

> [!IMPORTANT]
> A successful CLI sign-in does not grant the agent access to every folder on your computer. Poly UI still applies its workspace and approval boundaries.

## If an agent is unavailable

- Confirm the CLI is installed and available to the account that launched Poly UI.
- Sign in through the CLI itself.
- Return to Connections and select **Check again**.
- Read the status message in the provider card. It distinguishes an uninstalled CLI from a sign-in requirement.

