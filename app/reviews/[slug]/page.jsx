import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug)=> ({ slug }));
}

export default async function ReviewPage({ params } ) {
  const { slug } = await params;
  const review = await getReview(slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className='italic pb-2'>{review.date}</p>
      <img
        src={review.image} className="mb-2 rounded"
        width="640 px" height="360"
      />
      <article dangerouslySetInnerHTML={{ __html: review.body}} 
        className="max-w-screen-sm prose prose-slate">
      </article>
    </>
  );
}
