'use server';

import { setSessionCookie } from "@/lib/auth";
import { createUser, emailExists, usernameExists } from "@/lib/users";
import { redirect } from "next/navigation";

export async function signUpAction(formData) {
  
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  if (!email) {
    return { isError: true, message: "Email field is required" };
  }
  if (!password) {
    return { isError: true, message: "Password field is required" };
  }
  if (!username) {
    return { isError: true, message: "Username field is required" };
  }

  if(email.length > 45)
    return { isError: true, message: "Email field maxlength is 45" };
  if(password.length > 100)
    return { isError: true, message: "Password field maxlength is 100" };
  if(username.length > 45)
    return { isError: true, message: "Username field maxlength is 45" };

  const emailEx = await emailExists(email);
  if(emailEx) {
    return { isError: true, message: "Email already exists" };
  }

  const userEx = await usernameExists(username);
  if(userEx) {
    return { isError: true, message: "Username already exists" };
  }

  const user = await createUser(username, password, email);

  await setSessionCookie(user);
  redirect('/');
}
