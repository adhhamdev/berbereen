"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function BackNavBtn({ text }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center p-3 hover:text-slate-500"
    >
      <ArrowLeftIcon className="size-5 mr-2" />
      <h2 className="text-xl font-semibold">{text}</h2>
    </button>
  );
}
