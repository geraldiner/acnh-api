import axios from "axios";
import { formatRequestUrl } from "@/utils/env_utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hour: string; weather: string }> }
) {
  const { hour, weather } = await params;
  const splat = `/api/v2/hourly-bgm?hour=${hour}&weather=${weather}`;
  const response = await axios.get(formatRequestUrl("netlify", splat));

  return Response.json(response.data, { status: 200, statusText: "OK" });

  return Response.json({ message: "hello, hourly-bgm!" }, { status: 200 });
}
