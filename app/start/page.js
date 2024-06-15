import StartForm from "@/components/start-form";
import { getLoggedInUser } from "@/lib/server/appwrite";
import Image from "next/image";
import logoIcon from "/public/icon-192.png";

export const metadata = {
  title: "Get Started",
  description: "Create your profile",
};

const page = async () => {
  const user = await getLoggedInUser();

  return (
    <div className="md:flex-row flex flex-col items-center justify-center h-screen">
      <div className="md:py-20 md:h-full md:w-1/2 md:px-20 md:from-slate-800 md:to-slate-800 md:bg-gradient-to-t md:text-left md:flex md:flex-col md:justify-between md:rounded-r-lg text-center">
        <div className="hidden items-center md:flex">
          <Image
            className="w-24 rounded-full"
            src={logoIcon}
            alt="Berbereen Logo"
            priority
          />
        </div>
        <div>
          <h1 className="md:mb-2 text-4xl font-bold mb-8 md:text-white">
            Create Your Profile
          </h1>
          <h3 className="font-semibold mb-4 md:text-white">
            Complete your profile to get started.
          </h3>
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <div className="max-w-md mx-auto p-8">
          <StartForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default page;
