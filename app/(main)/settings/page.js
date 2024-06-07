import Popup from "@/components/popup";
import { CogIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Settings",
  description: "Set your preferences",
};

export default function Page({ params, searchParams}) {
  return (
    <div>
      <h1 className="flex items-center m-4 text-lg font-bold text-slate-700">
        <CogIcon className="size-6 mr-1" /> Settings
      </h1>
      <Popup params={params} searchParams={searchParams} />
    </div>
  );
}
