import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "components/Footer";
import Navbar from "components/NavBar";
import TanstackProvider from "../providers/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monitor tokens",
  description: "Generated by Studios Barnacle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <TanstackProvider>
          <div className="ml-5 mt-5">{children}</div>
        </TanstackProvider>
        <Footer />
      </body>
    </html>
  );
}
