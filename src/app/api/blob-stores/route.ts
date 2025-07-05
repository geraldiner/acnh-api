import axios from "axios";
import { NextResponse } from "next/server";
import { formatRequestUrl } from "@/app/utils/env_utils";

export async function GET() {
  const splat = "/api/v2/blob-stores";
  const response = await axios.get(formatRequestUrl("netlify", splat));

  return NextResponse.json(JSON.stringify(response.data), {
    status: 200,
    statusText: "OK",
  });
}
