"use client";
import {
  CloudArrowDownIcon,
  PencilIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Page({ params }) {
  const router = useRouter();
  const imageUrl = `/profile.jpg`;
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="fixed top-0 left-0 p-3">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-1 size-full"
        >
          <ArrowLeftIcon className="size-8 text-slate-600" />
        </button>
      </div>
      <Image
        className="w-full h-auto"
        src={imageUrl}
        width={500}
        height={500}
        alt=""
      />
      <div className="fixed bottom-0 left-0 right-0 p-2 m-2 bg-transparent backdrop-blur-md rounded-2xl flex justify-around">
        <button className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-2 size-full">
          <PencilIcon className="size-6" />
        </button>
        <button className="flex justify-center items-center hover:bg-slate-200 rounded-xl p-2 size-full">
          <CloudArrowDownIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}
