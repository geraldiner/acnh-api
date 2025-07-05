import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const searchParams = context.url.searchParams;
  const { category, key } = Object.fromEntries(searchParams);

  // Get audio store first
  const audioStore = getStore(category);

  // Get audio file from store
  const audioWithMetadata = await audioStore.getWithMetadata(key);

  if (!audioWithMetadata) {
    return new Response(JSON.stringify({ message: `Audio ${key} not found` }), {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    JSON.stringify({ message: `Audio ${key} found`, audioWithMetadata })
  );
};
