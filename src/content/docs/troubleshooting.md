Start with the status shown in Settings. Poly UI checks connections and agents directly, so the status usually points to the next action.

## A provider is not connected

- Confirm the endpoint is running and reachable.
- Check the endpoint spelling and remove a duplicated path such as `/v1/v1`.
- Re-enter the API key if the provider rotated or revoked it.
- Select **Test and save** again.

## No models appear

- Select **Refresh** on the saved connection.
- Confirm the provider account can list models.
- Check the server logs if the endpoint is local.
- Add the exact model ID manually when discovery is not supported.

## Ollama does not respond

Confirm Ollama is running, then check `http://127.0.0.1:11434` in the connection settings. Poly UI discovers the models exposed by that local server.

## Claude Code or Codex is unavailable

Install and sign in to the CLI outside Poly UI, then return to **Settings > Connections** and select **Check again**. The CLI must be available to the same user account that launched Poly UI.

## Web search fails

Check the selected search provider, its API key, and your network connection. The Local provider still needs a network connection to retrieve results.

## A request needs more access

Review the current access level. Chat only cannot read files, and workspace access cannot use the terminal. Increase access only for the task that needs it, then review the resulting changes.

> [!TIP]
> When reporting a bug, include the provider type, operating system, Poly UI version, and the status message. Do not include API keys or private workspace files.
