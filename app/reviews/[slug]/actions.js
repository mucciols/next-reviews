'use server';

import { createComment } from "@/lib/commets";

export async function createCommentAction(formData) {
    if(!formData.get("user")) {
      return { isError: true, message: 'Name field is required' }
    }
    const data = {
      slug: formData.get("slug"),
      user: formData.get("user"),
      message: formData.get("message"),
    }
    const message = await createComment(data);
 
    return message;
  }
