import { MapIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Explore",
  description: "The Feed",
};

export default function Page() {
  return (
    <div>
        <h1 className="flex items-center m-4 text-lg font-bold text-slate-700"><MapIcon className="size-6 mr-1" /> Explore</h1>
    </div>
  );
}
