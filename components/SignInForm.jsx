"use client";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "@/lib/hooks";

export default function SignInForm({ slug, title, notifySubmitComment }) {
  const [state, handleSubmit] = useFormState(signInAction, notifySubmitComment);

  return (
    <form
      onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <div className="flex">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Email
        </label>
        <input
          required
          id="emailField"
          name="email"
          type="email"
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="flex">
        <label htmlFor="passwordField" className="shrink-0 w-32">
          Password
        </label>

        <input
          required
          id="passwordField"
          name="password"
          type="password"
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {Boolean(state.error) && (
        <p className="text-red-700">{state.error}</p>
      )}

      <button type="submit" disabled={state.loading}
         className="bg-orange-800 rounded px-2 py-1 self-center text-slate-50 w-32 hover:bg-orange-700"
      >
        Sign in
      </button>

    </form>
  );
}