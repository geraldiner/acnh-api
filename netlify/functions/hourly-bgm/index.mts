import type { Context } from "@netlify/functions";
import { addLeadingZero, titleCase } from "../../../src/utils/format_utils";
import hourlyJson from "./hourly.json";

export default async (req: Request, context: Context) => {
  const [hour, weather] = context.url.pathname
    .split("/api-v2/hourly-bgm/")[1]
    .split("/");

  const hourData =
    hourlyJson[`BGM_24Hour_${addLeadingZero(hour)}_${titleCase(weather)}`];

  if (!hourData) {
    return Response.json(
      {
        message: `Hourly data not found for hour: ${hour}, weather: ${weather}`,
      },
      { status: 404, statusText: "Not found" }
    );
  }

  return Response.json(
    {
      message: `Hourly data found for hour: ${hour}, weather: ${weather}`,
      hourData,
    },
    { status: 200, statusText: "OK" }
  );
};
