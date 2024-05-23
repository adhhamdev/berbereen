import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-center mb-6">
          <ExclamationCircleIcon className="size-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">Page Not Found</h1>
        <p className="text-center mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-gray-200"
            scroll={false}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
