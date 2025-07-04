import type { Context } from "@netlify/functions";
import { getStore, listStores } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const stores = await listStores();

  if (!stores || !stores.stores) {
    return new Response(JSON.stringify({ message: "No stores found." }), {
      status: 404,
      statusText: "Stores not found",
    });
  }

  return new Response(
    JSON.stringify({ message: "Stores found.", stores: stores.stores }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};
