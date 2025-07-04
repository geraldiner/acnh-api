import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  // Accessing the request as `multipart/form-data`.
  const formData = await req.formData();

  // Access audio store
  const audioStore = getStore("audio");

  for (const [key] of formData) {
    const file = formData.get(key) as File;
    await audioStore.set(file.name, file, {
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
