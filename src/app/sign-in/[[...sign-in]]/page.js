import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="main-content">
        <SignIn />
      </div>
    </>
  );
}
