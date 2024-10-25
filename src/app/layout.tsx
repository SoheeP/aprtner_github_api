import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DisplayUserStoreProvider } from "@/providers/displayUserStoreProvider";
import NavLink from "./ui/navLink";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Apartner - Github User Search",
  description: "A simple Github user search app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavLink />
        <DisplayUserStoreProvider>{children}</DisplayUserStoreProvider>
      </body>
    </html>
  );
}
