import StartForm from "@/components/start-form";
import { initiateAvatar } from "@/lib/server/actions";
import { getLoggedInUser } from "@/lib/server/appwrite";

export const metadata = {
  title: "Get Started",
  description: "Create your profile",
};

const page = async () => {
  const user = await getLoggedInUser();
  if (!user?.prefs?.avatar) await initiateAvatar(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Create Your Profile
      </h1>
      <StartForm />
    </div>
  );
};

export default page;
