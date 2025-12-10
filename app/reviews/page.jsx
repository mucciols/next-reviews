import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 1;

export default async function ReviewsPage({ searchParams }) {
  // recupero i search params in maniera
  // asincrona perché sono delle promise
  const params = await searchParams;
  const page = parsePageParam(params.page);

  const reviews = await getReviews(PAGE_SIZE, page);
  return (
    <>
      <Heading>Reviews</Heading>
      <div>
        <Link href={`/reviews?page=${Number(page) - 1}`}> - </Link>
        <span> (Page {page}) </span>
        <Link href={`/reviews?page=${Number(page) + 1}`}> + </Link>
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li
            key={review.slug}
            className="bg-white rounded border border-gray-300 shadow w-80 hover:shadow-xl"
          >
            <Link href={`reviews/${review.slug}`}>
              <img
                alt={`${review.slug}`}
                src={`${review.image}`}
                className="mb-1 rounded-t"
                width="640"
                height="360"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
