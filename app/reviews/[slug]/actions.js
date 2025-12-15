"use server";

import { createComment } from "@/lib/commets";

export async function createCommentAction(formData) {
  
  console.log('creazione del commento, prima del check degli errori');
  
  if (!formData.get("user")) {
    return { isError: true, message: "Name field is required" };
  }

  console.log('creazione del commento, dopo  del check degli errori');
  
  const data = {
    slug: formData.get("slug"),
    user: formData.get("user"),
    message: formData.get("message"),
  };
  const message = await createComment(data);

  return message;
}
