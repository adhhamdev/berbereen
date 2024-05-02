import {
  HomeIcon,
  MapIcon,
  BuildingStorefrontIcon,
  BookmarkSquareIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow">
      <div className="flex justify-around py-2">
        <a
          href="#"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Home</span>
          <HomeIcon className="size-12 p-1 text-slate-700" />
        </a>
        <a
          href="#"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Explore</span>
          <MapIcon className="size-12 p-1 text-slate-700" />
        </a>
        <a
          href="#"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Market</span>
          <BuildingStorefrontIcon className="size-12 p-1 text-slate-700" />
        </a>
        <a
          href="#"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Saved</span>
          <BookmarkSquareIcon className="size-12 p-1 text-slate-700" />
        </a>
        <a
          href="#"
          className=" hover:text-gray-500 h-12 flex-grow flex justify-center items-center"
        >
          <span className="sr-only">Settings</span>
          <CogIcon className="size-12 p-1 text-slate-700" />
        </a>
      </div>
    </div>
  );
}
