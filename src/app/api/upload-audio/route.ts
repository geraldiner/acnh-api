import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const response = await axios.post(
      "http://localhost:8888/api/upload-audio",
      formData
    );
    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Something went wrong." },
        { status: 500, statusText: "Internal Server Error" }
      );
    }
    return NextResponse.json(
      { message: response.data.message },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
