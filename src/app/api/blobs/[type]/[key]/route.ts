import axios from "axios";
import { formatRequestUrl } from "@/utils/env_utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; key: string }> }
) {
  const { type, key } = await params;
  const splat = `/api/v2/blobs?type=${type}&key=${key}`;
  const response = await axios.get(formatRequestUrl("netlify", splat));

  return Response.json(response.data, {
    status: response.status,
    statusText: response.statusText,
  });
}
