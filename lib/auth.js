import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const JWT_COOKIE = 'sessionToken'
const JWT_SECRET = new TextEncoder().encode("aaa7d928a3f856a3875d30559493c5d24fae2c6e2769be46cbe05d60af642f66");

export async function getUserFromSession() {
  const sessionTokenCookie = (await cookies()).get(JWT_COOKIE);
  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify(sessionTokenCookie.value, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn('Invalid JWT' , error);
    }
  }
}

export async function setSessionCookie(user) {
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(JWT_SECRET);
  (await cookies()).set(JWT_COOKIE, sessionToken);
}