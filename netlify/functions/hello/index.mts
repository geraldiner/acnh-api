import type { Context } from "@netlify/functions";
import {
  parseParamsFromContext,
  titleCase,
} from "../../../src/utils/format_utils";

export default async (req: Request, context: Context) => {
  const params = parseParamsFromContext(context.url.pathname, "/api-v2/hello/");
  const [firstName, lastName] = params;
  return Response.json(
    `Hello, ${titleCase(firstName)} ${titleCase(lastName)}!`,
    { status: 200, statusText: "OK" }
  );
};
