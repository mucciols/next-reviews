import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import CommentListSkeleton from "@/components/CommentListSkeleton";

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
  //simulate delay
  // await new Promise((resolve)=> setTimeout(resolve, 2500));
  const review = await getReview(slug);
  if (!review) {
    console.log("non trovato");
    notFound();
  }

  // Ricevi il formData dal <form action={...}>
  const notificaCommentoInserito = async (formData) => { 
    "use server"; // Server Action

    // 3. Revalida il percorso per forzare il re-fetch dei dati (inclusa la CommentList)
    revalidatePath(`/reviews/${slug}`); 
  };

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
        <CommentForm slug={review.slug} notifySubmitComment={notificaCommentoInserito} title={review.title} />
        <Suspense fallback={ <CommentListSkeleton /> }>
          <CommentList slug={review.slug} />
        </Suspense>        
      </section>
    </>
  );
}
