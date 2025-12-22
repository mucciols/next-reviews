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

  //simula la latenza di una chiamata server side lunga
  await new Promise((resolve)=> setTimeout(resolve, 2500));
  //fine similazione

  const comments = await prisma.comment.findMany({
    where: { slug: slug },
    orderBy: { postedAt: 'desc'}
  });
  return comments;
}
