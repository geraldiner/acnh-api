import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { v4 as uuid } from "uuid";

export default async (req: Request, context: Context) => {
  // Accessing the request as `multipart/form-data`.
  const formData = await req.formData();

  // Access image store
  const imagesStore = getStore("images");

  for (const [key] of formData) {
    const file = formData.get(key) as File;
    await imagesStore.set(file.name, file, {
      metadata: {
        type: file.type,
      },
    });
  }

  return new Response(
    JSON.stringify({
      message: `${Array.from(formData.values()).length} file(s) were uploaded.`,
    }),
    { status: 200, statusText: "OK" }
  );
};
