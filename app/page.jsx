import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export default async function HomePage() {
  const reviews = await getReviews(3);
  //console.log("[HomePage getReviews 1]", reviews);
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">only the best indie games, reviewed for you</p>

      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug}>
            <div className="bg-white rounded border border-gray-300 w-80 shadow hover:shadow-xl sm:w-full">
              <Link
                href={`reviews/${review.slug}`}
                className="flex flex-col sm:flex-row"
              >
                <img
                  src={`${review.image}`}
                  className="mb-1 rounded-t sm:rounded-l sm:rounded-r-none"
                  width="640 px"
                  height="360"
                />
                <div className="px-2 py-1 text-center sm:text-left">
                  <h2 className="font-semibold font-orbitron">
                    {review.title}
                  </h2>
                  <p className="hidden pt-2 sm:block">
                    {review.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
