import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-15">
      <Image src="/404-page.png" alt="404-image" width={500} height={500} />
      <p className="mt-4 mb-2 text-lg">
        Oops! The page you are looking for does not exist on Spooky Spots. It
        might have been moved or deleted.
      </p>
      <Link href="/" className="mt-6 confirmButton text-lg transition-all w-50">
        Go Back to Home
      </Link>
    </div>
  );
}
