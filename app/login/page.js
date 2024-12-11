"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-gray-200 to-gray-400 overflow-hidden">
        {status === "loading" ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <div className="flex h-full w-full">
            {/* Left Section */}
            <div className="w-1/2 hidden sm:flex  justify-start items-start relative">
              {/* Background Image with Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url("https://as1.ftcdn.net/jpg/05/10/89/60/1000_F_510896078_Fb2dY9Mj6H6pClfkK7FS9FgLiyavq5sL.webp")',
                }}
              />
              {/* Text Overlay */}
              <div className="relative text-center bg-black bg-opacity-50 text-white rounded-lg m-4">
                <h1 className="text-2xl font-bold m-4">The Rapid Report</h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full sm:w-1/2 flex items-center justify-center bg-white">
              <div
                style={{ boxShadow: "0px 0px 20px 2px" }}
                className="card bg-white rounded-lg p-6 w-96 text-center"
              >
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome!
                </h1>
                <p className="text-gray-600 mb-6">
                  Sign in to access your dashboard.
                </p>
                <button
                  onClick={() => signIn("github")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                  Sign in using GitHub
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
