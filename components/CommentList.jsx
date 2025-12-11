"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CommentList({ slug }) {
  // questa chiamata deve essere fatta dentro a una API perché siamo 
  // in un componente client...dio boia
  // const comments = await getComments(slug);
  const [comments, setComments] = useState([]); // stato dei commenti

  useEffect(() => {
    async function fetchComments() {
      try {
        //questa api sta dentro al path /api/comments
        const res = await fetch(`/api/comments/${slug}`,{
          method: 'GET'
        });
        const data = await res.json();
        setComments(data);
      } 
      catch (err) {
      } 
    }

    if (slug) {
      fetchComments();
    }
  }, [slug]);

  if (comments.length === 0) {
    return <p className="italic mt-3">No Comments yet</p>;
  }

  return (
    <ul className="border mt-3 rounded">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            {comment.authorId}
          </div>
          <p className="italic">{comment.message}</p>
        </li>
      ))}
    </ul>
  );
}
