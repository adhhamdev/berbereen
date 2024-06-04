import StartForm from "@/components/start-form";
import { getLoggedInUser } from "@/lib/server/appwrite";

export const metadata = {
  title: "Get Started",
  description: "Create your profile",
};

const page = async ({ params, searchParams }) => {
  const user = await getLoggedInUser();
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen px-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Your Profile
        </h1>
        <StartForm user={user} />
      </div>
    </div>
  );
};

export default page;
