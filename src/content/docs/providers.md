Poly UI lets you keep several model connections available and choose the runtime per conversation or request.

## Supported connections

| Connection | Runs where | Credential | Model discovery |
| --- | --- | --- | --- |
| Ollama | On this device | None required by Poly UI | Reads the local model catalog |
| LM Studio | On this device | None required by Poly UI | Reads the OpenAI-compatible catalog |
| OpenAI | Cloud | API key | Reads `/models` |
| Anthropic | Cloud | API key | Reads the provider model catalog |
| Google Gemini | Cloud | API key | Reads the provider model catalog |
| OpenRouter | Cloud | API key | Reads the OpenAI-compatible catalog |
| Vercel AI Gateway | Cloud | Gateway key | Reads the gateway catalog |
| Custom endpoint | Your endpoint | Optional API key | Reads the OpenAI-compatible catalog |

## Add a connection

1. Open **Settings**.
2. Open **Connections**.
3. Choose **Add connection**.
4. Select a cloud, local, or custom provider.
5. Enter a name, endpoint, and API key when required.
6. Select **Test and save**.

Poly UI validates the connection before saving it. For saved connections, use **Refresh** to update the model catalog.

## Endpoints

Most providers work with their default endpoint. Override it only when you use a compatible gateway, a proxy, a self-hosted server, or a different API region.

Ollama defaults to `http://127.0.0.1:11434`. LM Studio defaults to `http://127.0.0.1:1234/v1`.

## Models

Poly UI discovers models when the provider exposes a catalog. If a provider does not return the model you need, open the connection, enter its exact model ID, and select **Add**.

> [!WARNING]
> A model ID is provider-specific. Copy it from the provider or local server rather than guessing a display name.

For endpoint details, see [Custom providers](#/docs/custom-providers).
