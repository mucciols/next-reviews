import { readFile } from 'node:fs/promises'
import Heading from "@/components/Heading";

export default async function StardewValleyPage() {
  const text = await readFile('./content/reviews/stardew-valley.md', 'utf8')

  return (
    <>
      <Heading>Stardew valley</Heading>
      <img
        src="/images/stardew-valley.jpg" className="mb-2 rounded"
        width="640 px" height="360"
      />
      <p>{text}</p>
    </>
  );
}
