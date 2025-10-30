import Link from "next/link";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function Header() {
  const user = await currentUser();
  const loggedInUser = await db.query(
    `SELECT clerk_id, role_id FROM users WHERE clerk_id = $1`,
    [user?.id]
  );
  const user_role = loggedInUser.rows[0]?.role_id;

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
                {user_role === 2 ? (
                  <Link
                    href={"/new"}
                    className="hover:text-(--hover-colour) transition-colors text-lg font-medium"
                  >
                    New Place
                  </Link>
                ) : null}
              </SignedIn>
            </nav>

            <div className="flex items-center gap-3">
              <SignedIn>
                <SignOutButton>
                  <button className="text-m border border-white-500 px-3 py-1 rounded-xl hover:text-black hover:bg-(--hover-colour) text-(--font-colour) cursor-pointer transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="text-m border border-white-500 px-3 py-1 rounded-xl hover:text-black hover:bg-(--hover-colour) text-(--font-colour) transition-colors">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-m border border-white-500 px-3 py-1 rounded-xl hover:text-black hover:bg-(--hover-colour) text-(--font-colour) transition-colors">
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
