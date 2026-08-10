Adding a provider changes more than a dropdown. It must be represented in the protocol, connection UI, runtime construction, model discovery, and tests.

## Start with the runtime seam

Provider creation and model discovery live in `sidecar/src/providers.ts`.

1. Add the provider to the protocol schema in `sidecar/src/protocol.ts`.
2. Add provider construction in `createModel`.
3. Add the provider's model discovery path in `listModels`.
4. Add the provider preset and label in the Connections settings.
5. Add the provider to the presentation grouping and runtime catalog.
6. Add tests for model creation, discovery, and connection validation.

## Keep the credential boundary

The connection model stores a keychain reference. The frontend receives summaries and sends connection IDs. Do not add an API key to Zustand state, local storage, a URL, a message record, or a log line.

## Compatible providers

If the service follows the OpenAI-compatible API shape, use the existing compatible provider path where possible. Set the correct base URL and model ID, then verify both model discovery and a streamed chat request.

## Verification checklist

- The provider appears in the right cloud, local, or custom section.
- Default endpoint behavior is correct.
- Credentials are validated and stored through the existing connection client.
- Model discovery handles the provider's real response shape.
- A missing or invalid catalog does not expose a raw secret in an error.
- The model picker and onboarding read the same runtime catalog.
- Frontend, sidecar, and Rust checks pass.

> [!WARNING]
> Do not add a second provider registry for one surface. The catalog is shared so Settings, onboarding, the model picker, and execution agree about availability.
