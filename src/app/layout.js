import { Nunito_Sans, Creepster } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const creepster = Creepster ({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-creepster",
})

export const metadata = {
  title: "Spooky Spots",
  description: "Book ghost tours and explore haunted places with Spooky Spots",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunitoSans.className} ${creepster.variable}`}>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
