import prisma from "@/lib/prisma.ts";

export async function createUser({ username, password, email }) {
  const comment = await prisma.user.create({
    data: {
      username: username,
      password: password,
      email: email
    },
  });
  return comment;
}