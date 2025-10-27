import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="main-content">
        <SignUp />
      </div>
    </>
  );
}
