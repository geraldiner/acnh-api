import hourlyJson from "./hourly.json";
import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { titleCase } from "../../../src/utils/format_utils";

export default async (req: Request, context: Context) => {
  const searchParams = context.url.searchParams;
  const { hour, weather } = Object.fromEntries(searchParams);

  const hourData = hourlyJson[`BGM_24Hour_${hour}_${titleCase(weather)}`];
  console.log(hourData);

  return new Response(
    JSON.stringify({
      message: `Hourly data found for hour: ${hour}, weather: ${weather}`,
      hourData: hourData,
    }),
    { status: 200, statusText: "OK" }
  );
};
