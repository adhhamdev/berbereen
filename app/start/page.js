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
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
              placeholder="Enter your name"
              autoComplete="name"
              enterKeyHint="next"
              maxLength={32}
              minLength={5}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
              placeholder="Enter your email"
              autoComplete="email"
              enterKeyHint="next"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
              placeholder="Enter a password"
              minLength={12}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
              placeholder="Enter a password"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0"
              type="button"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
