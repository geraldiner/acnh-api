import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  const formData = await req.formData();

  // Access audio store
  const audioStore = getStore("audio");
  let fileCount = 0;
  const fileNames: string[] = [];

  try {
    for (const [key] of formData) {
      const file = formData.get(key) as File;
      await audioStore.set(file.name, file, {
        metadata: { name: file.name, type: file.type },
      });
      fileCount += 1;
      fileNames.push(file.name);
    }
    return Response.json(
      {
        message: `${fileCount} file(s) were uploaded: ${fileNames.join(", ")}.`,
      },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    return Response.json(
      { message: "We're sorry. Something went wrong.", error },
      { status: 500, statusText: "Internal server error" }
    );
  }
};
