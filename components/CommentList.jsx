import { UserCircleIcon } from "@heroicons/react/24/outline";
  import { getComments } from "@/lib/commets";

// const comments = [
//   {    id: "1", user: "Alice",  message: "Love this game!",  },
//   {    id: "2", user: "Mark",   message: "Awesome!",  },
//   {    id: "3", user: "Dennis", message: "Incredible!",  },
// ];

export default async function CommentList({ slug }) {

  const comments = await getComments(slug);

  return (
    <ul className="border mt-3 rounded">
      {comments.map((comment) => (
        <li key={comment.id}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100">
          <div className="flex gap-3 pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            {comment.user}
          </div>
          <p className="italic">
            {comment.message}
          </p>
        </li>
      ))}
    </ul>
  );
}
