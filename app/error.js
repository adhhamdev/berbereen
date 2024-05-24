"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (error && typeof error === "object" && error.message) {
      console.log(error.message);
    } else {
      console.log("An error occurred:", error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-4">
          {error.statusCode === 404 ? (
            <span>Oops, the thing you&apos;re looking for doesn&apos;t exist.</span>
          ) : error.statusCode === 500 ? (
            <span>Uh oh, something went wrong on our end.</span>
          ) : (
            <span>{error.message || "An unexpected error occurred."}</span>
          )}
        </h2>
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
