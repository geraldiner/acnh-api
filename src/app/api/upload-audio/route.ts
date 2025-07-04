import axios from "axios";
import { formatRequestUrl } from "@/utils/env_utils";

export async function POST(request: Request) {
  // Get request data to pass
  const data = await request.json();
  try {
    const splat = "/api/v2/upload-audio";
    const response = await axios.post(formatRequestUrl("netlify", splat), data);

    if (response.status !== 200) {
      return Response.json(
        { message: response.data.message },
        { status: 500, statusText: "Internal Server Error" }
      );
    }
    return Response.json(
      { message: response.data.message },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: error },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
