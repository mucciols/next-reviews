import { readFile } from 'node:fs/promises'
import { marked } from 'marked'
import Heading from "@/components/Heading";

export default async function StardewValleyPage() {
  const text = await readFile('./content/reviews/stardew-valley.md', 'utf8');
  const html = marked(text);

  return (
    <>
      <Heading>Stardew valley</Heading>
      <img
        src="/images/stardew-valley.jpg" className="mb-2 rounded"
        width="640 px" height="360"
      />
      <article dangerouslySetInnerHTML={{ __html: html}} 
        className="max-w-screen-sm prose prose-slate">

      </article>
    </>
  );
}
