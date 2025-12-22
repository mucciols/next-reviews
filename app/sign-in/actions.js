'use server';

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET =  new TextEncoder().encode('some-random-string');

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
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(JWT_SECRET);
  (await cookies()).set('sessionToken', sessionToken)
  redirect('/');
}

function authenticate(email, password) {
  if(email.endsWith('@example.com') && password === "test") {
    return { email }
  }
}