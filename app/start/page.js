import StartForm from "@/components/start-form";

export const metadata = {
  title: "Get Started",
  description: "Create your profile",
};

const page = ({ params, searchParams }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen px-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Your Profile
        </h1>
        <StartForm />
      </div>
    </div>
  );
};

export default page;
