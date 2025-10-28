import Link from "next/link";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";

export default async function Header() {
  return (
    <>
      <div>
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
          <div>
            <h1 className="text-3xl font-extrabold text-white-500">
              Spooky Spots
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="flex space-x-4">
              <Link
                href={"/"}
                className="text-gray-300 hover:text-red-400 transition-colors text-lg font-medium"
              >
                Home
              </Link>
              <Link
                href={"/user/usernamer"}
                className="text-gray-300 hover:text-red-400 transition-colors text-lg font-medium"
              >
                Profile
              </Link>
              <Link
                href={"/hellfire-caves"}
                className="text-gray-300 hover:text-red-400 transition-colors text-lg font-medium"
              >
                Hellfire Caves
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <SignedIn>
                <UserButton />
                <SignOutButton>
                  <button className="text-sm border border-gray-500 px-3 py-1 rounded hover:bg-red-600 hover:border-red-600 transition-colors text-white">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="text-sm border border-gray-500 px-3 py-1 rounded hover:bg-gray-700 transition-colors text-white">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                    Sign-up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
