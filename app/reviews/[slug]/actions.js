'use server';

import { getUserFromSession } from "@/lib/auth";
import { createComment } from "@/lib/commets";

export async function createCommentAction(formData) {
  const user = await getUserFromSession()
  if (!user) {
    return { isError: true, message: "Unauthorized" };
  }

  //console.log('[createCommentAction] user:', user);

  const data = {
    slug: formData.get("slug"),
    user: user.username,
    message: formData.get("message"),
  };
  const message = await createComment(data);

  return message;
}