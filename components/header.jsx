import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header className="text-gray-600 body-font bg-slate-400">
        <div className="container mx-auto flex p-5">
          <Link href="/" className="flex title-font font-medium items-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl" translate="no">Berbereen</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
