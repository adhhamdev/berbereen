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
    <div className={`${inter.className} flex flex-col items-center justify-center h-screen bg-white`}>
      <div className="p-16 m-5 rounded-xl shadow-2xl text-center">
        <h2 className="text-xl font-semibold text-black mb-8">
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
          className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mt-8"
          onClick={reset}
        >
          Try again
        </button>
        <Link
          href="/"
          className="block mt-4 hover:bg-slate-300 font-bold py-2 px-4 rounded-full border-2 border-slate-400"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
