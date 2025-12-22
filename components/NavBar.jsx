import { cookies } from "next/headers";
import NavLink from "./NavLink";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode("some-random-string");

async function getUserFromSession() {
  const sessionTokenCookie = (await cookies()).get("sessionToken");
  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify(sessionTokenCookie.value, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn('Invalid JWT' , error);
    }
  }
}

export default async function NavBar() {
  const user = await getUserFromSession();
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/">Indie Gamer</Link> */}
          <NavLink href="/">Indie Gamer</NavLink>
        </li>
        <li className="ml-auto">
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/reviews">Reviews</Link> */}
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/about" prefetch={false}>About</Link> */}
          <NavLink href="/about">About</NavLink>
        </li>
        {user ? (
          <li>{user.email}</li>
        ) : (
          <li>
            <NavLink href="/sign-in">Sign in</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
