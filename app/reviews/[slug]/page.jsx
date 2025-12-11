import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  // console.log('[ReviewPage] generateStaticParams', slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const review = await getReview(slug);
  console.log("[ReviewPage] review:", review);
  if (!review) {
    console.log("non trovato");
    notFound();
  }
  //console.log('[ReviewPage] rendering: ', slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButtons />
      </div>
      <img
        src={review.image}
        alt={`${review.slug}`}
        className="mb-2 rounded"
        width="640"
        height="360"
      />

      <article
        dangerouslySetInnerHTML={{ __html: review.body.children[0].text }}
        className="max-w-screen-sm prose prose-slate"
      ></article>

      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm title={review.title} />
        <CommentList />
      </section>
    </>
  );
}
