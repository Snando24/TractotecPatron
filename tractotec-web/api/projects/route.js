import { kv } from "@vercel/kv";

const PROJECTS_KEY = "tractotec-projects";

export async function GET() {
  try {
    if (!process.env.KV_URL) {
      return Response.json([]);
    }

    const projects = await kv.get(PROJECTS_KEY);
    return Response.json(projects ?? []);
  } catch {
    return Response.json([]);
  }
}

export async function PUT(request) {
  try {
    if (!process.env.KV_URL) {
      return Response.json([]);
    }

    const payload = await request.json();
    await kv.set(PROJECTS_KEY, payload);
    return Response.json(payload);
  } catch {
    return Response.json([]);
  }
}
