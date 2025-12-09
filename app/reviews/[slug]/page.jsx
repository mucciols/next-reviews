import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  console.log('[ReviewPage] generateStaticParams', slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;

  const review = await getReview(slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButtons />
      </div>
      <img src={review.image} className="mb-2 rounded"
        width="640"  height="360"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      ></article>
    </>
  );
}
