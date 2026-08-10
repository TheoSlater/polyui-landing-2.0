Use a custom provider when your server speaks the OpenAI-compatible API shape but is not one of the named providers in Settings.

## What the endpoint needs

Poly UI uses the endpoint to discover models and create chat requests. Your base URL should expose the compatible model catalog and chat API under the path your server expects.

Common examples look like:

~~~text
https://provider.example/v1
http://127.0.0.1:8000/v1
~~~

The exact base URL is defined by the server. Do not add `/v1` twice.

## Add the connection

1. Open **Settings > Connections**.
2. Select **Add connection**, then **Custom endpoint**.
3. Enter a name that tells you what the endpoint is.
4. Enter the base URL.
5. Add an API key if the server requires one.
6. Select **Test and save**.
7. Refresh models or add the exact model ID manually.

Poly UI sends the credential through the Rust host to the sidecar for the request. It does not put the secret in frontend state, conversation records, URLs, or sidecar logs.

## If model discovery fails

Check these in order:

- The base URL is the API base, not a web dashboard URL.
- The server exposes an OpenAI-compatible `/models` response.
- The API key has permission to list models and create chat requests.
- The model ID is accepted by the server.
- A proxy or local firewall allows the request.

> [!TIP]
> If the server can answer chat requests but does not implement model discovery, use **Add** in the connection's Models section and enter the model ID manually.
