import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPost } from "@/service/posts";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPost(context.params.id).then((data) => NextResponse.json(data))
  );
}
