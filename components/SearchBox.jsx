"use client";

import { useIsClient } from "@/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const reviews = [
  { slug: "Hellblade", title: "Hellblade" },
  { slug: "hades-2018", title: "Hades" },
  { slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
  { slug: "black-mesa", title: "Black Mesa" },
  { slug: "disco-elysium", title: "Disco Elysium" },
  { slug: "dead-cells", title: "Dead Cells" },
  { slug: "a-way-out-2018", title: "A Way Out" },
];

export default function SearchBox() {
  const router = useRouter(); 
  const isClient = useIsClient();
  const [query, setQuery] = useState('');

  console.log('[SearchBox] query:' , query);
  if (!isClient) {
    return null;
  }

  const handleChange = (review) => {
    //console.log('[handleChange] review: ' , review);
    router.push(`/reviews/${review.slug}`)
    //router.push(`/reviews/Hellblade`)
  };

  const filteterdReviews = reviews.filter(review=> review.title.includes(query) )

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query} onChange={ (event) => setQuery(event.target.value) }
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filteterdReviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
