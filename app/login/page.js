import { signUpWithGoogle } from "@/lib/server/oauth";
import { righteous } from "@/lib/fonts";
import Image from "next/image";
import logoIcon from "/public/icon-192.png";
import LoginForm from "@/components/login-form";
import Popup from "@/components/popup";

export const metadata = {
  title: "Log In",
  description: "Log in to Berbereen",
};

export default async function Page({ params, searchParams }) {
  return (
    <div>
      <div className="md:flex-row flex flex-col items-center justify-center h-screen">
        <div className="md:py-20 md:h-full md:w-1/2 md:px-20 md:from-slate-800 md:to-slate-800 md:bg-gradient-to-t md:text-left md:flex md:flex-col md:justify-between text-center md:rounded-r-lg">
          <div className="flex items-center mb-20">
            <Image
              className="mx-auto md:mx-0 w-24 rounded-full"
              src={logoIcon}
              alt="Berbereen Logo"
              priority
            />
            <span
              className={`${righteous.className} ml-4 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 md:hidden`}
              translate="no"
            >
              Berbereen.
            </span>
          </div>
          <div>
            <h1 className="md:mb-2 text-4xl font-bold mb-3 md:text-white">
              Log In
            </h1>
            <h3 className="font-semibold mb-4 md:text-gray-300 text-gray-500">
              Log in to your account to get started
            </h3>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="max-w-md mx-auto p-8">
            <LoginForm />
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Or</span>
            </div>
            <div className="mt-2 space-y-2">
              <form action={signUpWithGoogle}>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full py-2 px-4 hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-gray-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="ml-2">Continue with Google</span>
                </button>
              </form>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?
              </span>
              <a
                href="/signup"
                className="p-2 text-sm text-blue-600 hover:underline"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {searchParams.action && (
        <Popup params={params} searchParams={searchParams} />
      )}
    </div>
  );
}
