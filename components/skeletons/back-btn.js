"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-1 size-full">
      <ArrowLeftIcon className="size-8 text-slate-600" />
    </button>
  );
};

export default BackBtn;
