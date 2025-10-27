import Link from "next/link";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default async function Header() {
  return (
    <>
      <header>
        <div>
          <h1>Hivemind</h1>
        </div>
        <div>
          <nav>
            <Link href={"/"}>Home</Link>
          </nav>
          <SignedIn>
            <UserButton />
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
      </header>
    </>
  );
}
