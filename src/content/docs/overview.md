Poly UI brings local models, hosted providers, and coding agents into one focused desktop workspace. Choose where a request runs, keep conversations on your device, and give external tools only the access you approve.

> [!NOTE]
> Poly UI does not require a Poly UI cloud account. A hosted provider may still require its own API key, and a coding agent may require its own CLI sign-in.

## What you can do

- Chat with local models through Ollama or LM Studio.
- Connect OpenAI, Anthropic, Google Gemini, OpenRouter, Vercel AI Gateway, or another OpenAI-compatible endpoint.
- Use Claude Code or Codex from the workspace where you already use them.
- Search the web, attach files, and keep source-linked results close to the conversation.
- Let an agent read approved folders, edit workspace files, or use the sandboxed terminal when you choose that access level.

## Start here

1. [Install Poly UI](#/docs/install)
2. [Complete first run](#/docs/first-run)
3. [Connect a provider](#/docs/providers)
4. [Choose your access level](#/docs/workspace-access)

## A useful mental model

Poly UI separates a connection from a runtime. A connection describes a provider, endpoint, credential reference, and model catalog. A runtime is the model or coding agent selected for one request.

This makes it safe to keep several providers configured and switch between them without moving credentials into the interface or into chat history.

## Keep going

If you are setting up Poly UI for the first time, read [First run](#/docs/first-run). If you already have an endpoint that speaks the OpenAI API shape, go straight to [Custom providers](#/docs/custom-providers).

