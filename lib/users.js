import prisma from "@/lib/prisma.ts";

export async function authenticateUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email, password },
  });
  return user;
}

export async function createUser(username, password, email) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });
  return user;
}

export async function usernameExists(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
    },
  });

  return !!user;
}

export async function emailExists(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email, // è unique nel model
    },
    select: {
      id: true,
    },
  });

  return !!user;
}
