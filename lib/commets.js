import prisma from "@/lib/prisma.ts";

export async function createComment({ slug, user, message }) {
  const comment = await prisma.comment.create({
    data: {
      slug: slug,
      authorId: user,
      message: message,
      postedAt: new Date(),
    },
  });
  return comment;
}

export async function getComments(slug) {
  const comments = await prisma.comment.findMany({
    where: { slug: slug },
    orderBy: { postedAt: 'desc'}
  });
  return comments;
}
