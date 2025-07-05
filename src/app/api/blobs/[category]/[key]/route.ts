import axios from "axios";
import { formatRequestUrl } from "@/app/utils/env_utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; key: string }> }
) {
  const { category, key } = await params;
  const splat = `/api/v2/blobs?category=${category}&key=${key}`;
  const response = await axios.get(formatRequestUrl("netlify", splat));

  return Response.json(response.data, {
    status: response.status,
    statusText: response.statusText,
  });
}
