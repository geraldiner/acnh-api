import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const uploads = getStore({
    name: "audio",
    siteID: "c523718e-5dc2-4f40-87e4-efc87504ea62",
  });
  const { blobs } = await uploads.list();

  console.log(blobs);

  return new Response(JSON.stringify({ message: "all good" }), {
    status: 200,
    statusText: "OK",
  });
};
