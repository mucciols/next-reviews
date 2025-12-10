"use client";

import { useIsClient } from "@/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce'

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = 'api/search?query=' + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal })
        const revs = await response.json()
        setReviews(revs);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  //console.log('[SearchBox] query:', {query , debouncedQuery});

  if (!isClient) {
    return null;
  }

  const handleChange = (review) => {
    router.push(`/reviews/${review.slug}`);
  };

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
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
