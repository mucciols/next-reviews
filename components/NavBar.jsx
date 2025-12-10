import NavLink from './NavLink';

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/">Indie Gamer</Link> */}
          <NavLink href="/" >Indie Gamer</NavLink>
        </li>
        <li className='ml-auto'>
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/reviews">Reviews</Link> */}
          <NavLink href="/reviews" >
            Reviews
          </NavLink>
        </li>
        <li>
          {/* <Link className='font-orbitron text-orange-800 hover:underline' href="/about" prefetch={false}>About</Link> */}

          <NavLink href="/about">
            About
          </NavLink>

        </li>
      </ul>
    </nav>
  );
}
