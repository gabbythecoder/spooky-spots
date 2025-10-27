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
      <header>
        <div>
          <h1>Spooky Spots</h1>
        </div>
        <div className="flex justify-between">
          <nav>
            <Link href={"/"}>Home</Link>
          </nav>
          <div className="flex gap-5">
            <SignedIn>
              <UserButton />
              <SignOutButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button>Login</button>
              </SignInButton>
              <SignUpButton>
                <button>Sign-up</button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </header>
    </>
  );
}
