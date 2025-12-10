import { CACHE_TAGS_REVIEW } from "@/lib/reviews";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  if(payload.model === 'review') {
    revalidateTag(CACHE_TAGS_REVIEW);
  }
  //console.log('payload:', payload);
  return new Response(null, { status: 204 });
}
