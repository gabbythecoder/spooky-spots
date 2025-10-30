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
      <div className="bg-black">
        <header className="flex flex-col md:flex-row justify-between items-center p-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-extrabold text-white-500">
              <Link href={"/"}>Spooky Spots</Link>
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="flex space-x-4">
              <Link
                href={"/"}
                className="hover:text-(--hover-colour) transition-colors text-lg font-medium"
              >
                Home
              </Link>
              <SignedIn>
                <Link
                  href={"/user/profile"}
                  className="hover:text-(--hover-colour) transition-colors text-lg font-medium"
                >
                  Profile
                </Link>
              </SignedIn>
            </nav>

            <div className="flex items-center gap-3">
              <SignedIn>
                <SignOutButton>
                  <button className="text-m border-2 border-white-500 px-3 py-1 rounded-[50px] hover:text-black hover:bg-(--hover-colour) text-(--font-colour) cursor-pointer transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="text-m border-2 border-white-500 px-3 py-1 rounded-[50px] hover:text-black hover:bg-(--hover-colour) text-(--font-colour) cursor-pointer transition-colors">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-m border-2 border-white-500 px-3 py-1 rounded-[50px] hover:text-black hover:bg-(--hover-colour) text-(--font-colour) cursor-pointer transition-colors">
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
