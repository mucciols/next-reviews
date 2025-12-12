'use server';

import { createComment } from "@/lib/commets";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function createCommentAction(formData) {
//   if (!formData.get("user")) {
//     return { isError: true, message: "Message" };
//   }
//   const data = {
//     slug: formData.get("slug"),
//     user: formData.get("user"),
//     message: formData.get("message"),
//   };
//   const message = await createComment(data);
//   console.log("created:", message);
//   revalidatePath(`/reviews/${data.slug}`);
//   redirect(`/reviews/${data.slug}`);
// }

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
    console.log("---created---: ", message);
    revalidatePath(`/reviews/${data.slug}`);
    redirect(`/reviews/${data.slug}`);
  }
