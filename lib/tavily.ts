import { tavily, type TavilyClient } from "@tavily/core";

let client: TavilyClient | null = null;

function getClient(): TavilyClient {
  if (!client) {
    client = tavily({ apiKey: process.env.TAVILY_API_KEY! });
  }
  return client;
}

type TavilySearchResult = {
  title: string;
  url: string;
  content: string;
  favicon?: string;
};

export async function searchMarket(
  idea: string,
  category?: string,
  targetCustomer?: string
): Promise<TavilySearchResult[]> {
  const queryParts = [idea];
  if (category && category !== "other") queryParts.push(category);
  if (targetCustomer) queryParts.push(targetCustomer);

  const query = `${queryParts.join(" ")} competitors alternatives market`;

  const response = await getClient().search(query, {
    searchDepth: "advanced",
    maxResults: 10,
    includeAnswer: false,
  });

  return response.results.map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content,
    favicon: (r as Record<string, unknown>).favicon as string | undefined,
  }));
}
