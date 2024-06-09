import Popup from "@/components/popup";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Market",
  description: "Sell & Buy Goods",
};

export default function Page({ params, searchParams}) {
  return (
    <div>
      <h1 className="flex items-center m-4 text-lg font-bold text-slate-700">
        <BuildingStorefrontIcon className="size-6 mr-1" /> Market
      </h1>
      {searchParams.action && <Popup params={params} searchParams={searchParams} />}

    </div>
  );
}
