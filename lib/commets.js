import "server-only";
import prisma from "@/lib/prisma.ts";

export async function getComments(slug) {
  
  const comments = await prisma.comment.findMany({
    where: {
      slug: slug,
    },
  });

  return comments;
}