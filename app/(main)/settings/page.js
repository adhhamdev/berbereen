import { CogIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
export default async function Page() {
    const user = await getLoggedInUser();
  if (!user) redirect("/login");
    return (
        <div>
            <h1 className="flex items-center m-4 text-lg font-bold text-slate-700"><CogIcon className="size-6 mr-1" /> Settings</h1>
        </div>
    );
}