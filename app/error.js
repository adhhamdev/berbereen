"use client";
import { inter } from "@/lib/fonts";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (error && typeof error === "object" && error.message) {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred:", error);
    }
  }, [error]);

  return (
    <div
      className={`${inter.className} flex flex-col items-center justify-center h-screen bg-white`}
    >
      <div className="p-16 m-5 text-center shadow-2xl rounded-xl">
        <h2 className="mb-8 text-xl font-semibold text-black">
          {error.statusCode === 404 ? (
            <span>
              Oops, the thing you&apos;re looking for doesn&apos;t exist.
            </span>
          ) : error.statusCode === 500 ? (
            <span>Uh oh, something went wrong on our end.</span>
          ) : error.statusCode === 400 ? (
            <span>Oops, there was a problem with your request.</span>
          ) : error.statusCode === 401 ? (
            <span>Unauthorized access. Please log in.</span>
          ) : error.statusCode === 403 ? (
            <span>You don&apos;t have permission to access this resource.</span>
          ) : (
            <span>{"An unexpected error occurred. Try again."}</span>
          )}
        </h2>
        <button
          className="px-4 py-2 mt-8 font-bold text-white rounded-md bg-slate-900 hover:bg-gray-700"
          onClick={reset}
        >
          Try again
        </button>
        <Link
          href="/"
          className="block px-4 py-2 mt-4 font-bold border-2 rounded-full hover:bg-slate-300 border-slate-400"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
