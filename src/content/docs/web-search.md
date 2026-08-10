Web search adds current context to a request and keeps the returned sources attached to the answer.

## Choose a search provider

Open **Settings > Web search** and choose one of the configured providers:

| Provider | Key required | Notes |
| --- | --- | --- |
| Local | No | Uses DuckDuckGo HTML search. |
| Exa | Yes | Add an Exa API key. |
| Ollama | Yes | Add an Ollama web search key. |
| Tavily | Yes | Add a Tavily API key. |

Keys are stored locally and sent only to the selected search provider.

## Use search in a conversation

Enable web search for the request, then ask a question that benefits from current information. Poly UI passes the search results to the model and preserves the citations with the response.

## Network behavior

The Local option does not require an API key, but it still makes a network request to fetch search results. Cloud search providers also send the query to the service you selected.

> [!NOTE]
> Search results are context, not a guarantee. Open the cited source and check dates, authorship, and the original claim before relying on it.

## Troubleshooting

If search fails, check the selected provider, the saved key, and your network connection. A missing key is reported before Poly UI starts a remote search request.

