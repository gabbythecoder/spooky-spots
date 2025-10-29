import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Spooky Spots",
  description: "Book ghost tours and explore haunted places with Spooky Spots",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunitoSans.className}>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
