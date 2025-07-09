import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { parseParamsFromContext } from "../../../src/utils/format_utils";

export default async (req: Request, context: Context) => {
  const params = parseParamsFromContext(context.url.pathname, "/api-v2/blobs/");

  const [type, key] = params;

  // Get store first
  const store = getStore(type);

  // Get file from store
  const blob = await store.get(key, { type: "stream" });

  if (!blob) {
    return Response.json(
      { message: `Blob ${key} not found` },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return new Response(blob, { status: 200, statusText: "OK" });
};
