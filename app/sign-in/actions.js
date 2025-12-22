'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(formData) {
  
  if (!formData.get("email")) {
    return { isError: true, message: "Email field is required" };
  }
  if (!formData.get("password")) {
    return { isError: true, message: "Password field is required" };
  }
  const user = authenticate(formData.get("email"),formData.get("password") );
  if(!user) {
    return { isError: true, message: "Invalid credentials" };
  }
  (await cookies()).set('user', JSON.stringify(user))
  redirect('/');
  
}

function authenticate(email, password) {
  if(email.endsWith('@example.com') && password === "text") {
    return { email }
  }
}