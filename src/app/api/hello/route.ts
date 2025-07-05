export async function GET() {
  return Response.json({ message: "hello, world!" }, { status: 200 });
}
