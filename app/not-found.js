import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-6 mx-auto">
        <div className="flex items-center justify-center mb-6">
          <ExclamationCircleIcon className="text-red-500 size-16" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-center">Page Not Found</h1>
        <p className="mb-6 text-center">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 text-white rounded bg-slate-900 hover:bg-gray-200"
            scroll={false}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
