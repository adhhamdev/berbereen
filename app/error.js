"use client";
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
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-4">
          {error.statusCode === 404 ? (
            <span>Oops, the thing you&apos;re looking for doesn&apos;t exist.</span>
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
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
