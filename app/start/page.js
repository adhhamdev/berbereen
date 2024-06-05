import StartForm from "@/components/start-form";
import { initiateAvatar } from "@/lib/server/actions";
import { getLoggedInUser } from "@/lib/server/appwrite";

export const metadata = {
  title: "Get Started",
  description: "Create your profile",
};

const page = async () => {
  const user = await getLoggedInUser();
  if (!user.prefs.avatar) await initiateAvatar(user);

  const ProfileCreatePage = () => {
    const [formData, setFormData] = useState({
      name: "",
      bio: "",
      profilePicture: null,
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission, e.g., send data to server
      console.log(formData);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block font-bold mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block font-bold mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Create Profile
          </button>
        </form>
      </div>
    );
  };
};

export default page;
