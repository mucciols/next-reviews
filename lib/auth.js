import { cache } from "react";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const JWT_COOKIE = 'sessionToken'
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; //2 weeks
const JWT_SECRET = new TextEncoder().encode("aaa7d928a3f856a3875d30559493c5d24fae2c6e2769be46cbe05d60af642f66");

export async function deleteSessionCookie() {
  (await cookies()).delete(JWT_COOKIE);
}

const decodeSessionToken = cache(async (sessionToken)=>{
  try {
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn('Invalid JWT' , error);
    }
});

export async function getUserFromSession() {
  const sessionToken = (await cookies()).get(JWT_COOKIE)?.value;
  if (sessionToken) {
    return decodeSessionToken(sessionToken);
  }
}

export async function setSessionCookie(user) {
  const expirationTime = new Date(Date.now() + JWT_DURATION);
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);
  (await cookies()).set(JWT_COOKIE, sessionToken,{
    expires: expirationTime,
    httpOnly: true,
    sameSite: 'lax'
  });
}
