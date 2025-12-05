import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";

export default async function HomePage() {
  const review = await getFeaturedReview();
  return(
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">
        only the best indie games, reviewed for you
      </p>
       <div className="bg-white rounded border border-gray-300 w-80 shadow hover:shadow-xl sm:w-full">
          <Link href={`reviews/${review.slug}`} 
            className="flex flex-col sm:flex-row">
            <img
              src={`${review.image}`}
              className="mb-1 rounded-t sm:rounded-l sm:rounded-r-none"
              width="640 px"
              height="360"
            />
            <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">{ review.title }</h2>
          </Link>
        </div>
    </>
  )
}