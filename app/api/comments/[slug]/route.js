import { createComment, getComments } from "@/lib/commets";
import { NextResponse } from "next/server";

export async function POST(request) {

  const data = {}; //extract request body

  createComment(data);
}

export async function GET(request) {
  // esempio: "/api/comments/Hellblade"
  const url = request.nextUrl;
  const pathname = url.pathname; 
  const parts = pathname.split("/");
  const slug = parts[parts.length - 1];

  if (slug) {
    //console.log("[--- COMMENTO ---]", slug);
    const comments = await getComments(slug);
    return NextResponse.json(comments);
  }
  return NextResponse.json();
}
