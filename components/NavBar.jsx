import { getUserFromSession } from "@/lib/auth";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

export default async function NavBar() {
  const user = await getUserFromSession();
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/">Indie Gamer</NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
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
