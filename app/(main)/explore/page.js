import Popup from "@/components/popup";
import { MapIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Explore",
  description: "Find anything in Beruwala",
};

export default function Page({ params, searchParams }) {
  return (
    <div>
      <h1 className="flex items-center m-4 text-lg font-bold text-slate-700">
        <MapIcon className="size-6 mr-1" /> Explore
      </h1>
      {searchParams.action && <Popup params={params} searchParams={searchParams} />}
    </div>
  );
}
