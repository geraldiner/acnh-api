import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const searchParams = context.url.searchParams;
  const { type, key } = Object.fromEntries(searchParams);

  // Get store first
  const store = getStore(type);

  // Get file from store
  const blobWithMetadata = await store.getWithMetadata(key);

  if (!blobWithMetadata) {
    return new Response(JSON.stringify({ message: `Blob ${key} not found` }), {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    JSON.stringify({ message: `Blob ${key} found`, blobWithMetadata })
  );
};
