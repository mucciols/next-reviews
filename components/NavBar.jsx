import { getUserFromSession } from "@/lib/auth";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

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
          // <li>{user.email}</li>
          <li>
            <SignOutButton />
          </li>
        ) : (
          <li>
            <NavLink href="/sign-in">Sign in</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
