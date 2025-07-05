import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const formData = await req.json();

  // Access image store
  const imagesStore = getStore("images");

  const formDataKeys = Object.keys(formData);
  formDataKeys.forEach(async (key) => {
    const fileData = JSON.parse(formData[key]);
    await imagesStore.set(fileData.name, fileData.fileInBase64, {
      metadata: { type: fileData.type },
    });
  });

  return new Response(
    JSON.stringify({
      message: `${formDataKeys.length} file(s) were uploaded.`,
    }),
    { status: 200, statusText: "OK" }
  );
};
