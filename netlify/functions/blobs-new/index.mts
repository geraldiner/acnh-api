import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const [type, key] = context.url.pathname
    .split("/api/v2/blobs-new/")[1]
    .split("/");

  // Get store first
  const store = getStore(type);

  // Get file from store
  const blob = await store.get(key, { type: "stream" });

  if (!blob) {
    return new Response(JSON.stringify({ message: `Blob ${key} not found` }), {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(blob);
};
