import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://localhost:8888/api/v2/blob-stores");
  const json = await response.json();

  return NextResponse.json(json, { status: 200, statusText: "OK" });
}
