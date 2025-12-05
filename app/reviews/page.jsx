import Link from "next/link";
import Heading from "@/components/Heading";

export default function ReviewsPage() {
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-col gap-3">
        <li className="bg-white rounded border border-gray-300 shadow w-80 hover:shadow-xl">
          <Link href="reviews/hollow-knight">
            <img
              src="/images/hollow-knight.jpg"
              className="mb-1 rounded-t"
              width="640 px"
              height="360"
            />
            <h2 className="py-1 text-center">Hollow knight</h2>
            
          </Link>
        </li>
        <li className="bg-white rounded border border-gray-300 shadow w-80 hover:shadow-xl">
          <Link href="reviews/hollow-knight">
            <img
              src="/images/stardew-valley.jpg"
              className="mb-1 rounded-t"
              width="640 px"
              height="360"
            />
            <h2 className="py-1 text-center">Stardew Valley</h2>
          </Link>
        </li>
      </ul>
    </>
  );
}
