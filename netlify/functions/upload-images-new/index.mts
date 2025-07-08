import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const formData = await req.formData();

  // Access image store
  const imagesStore = getStore("images");
  let fileCount = 0;

  for (const [key] of formData) {
    const file = formData.get(key) as File;
    await imagesStore.set(file.name, file, {
      metadata: { name: file.name, type: file.type },
    });
    fileCount += 1;
  }

  return new Response(
    JSON.stringify({
      message: `${fileCount} file(s) were uploaded.`,
    }),
    { status: 200, statusText: "OK" }
  );
};
