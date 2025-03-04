import { Geist, Geist_Mono } from "next/font/google";
import "../css/global.css";
import "../css/header.css";
import "../css/buttons.css";
import Navbar from "@/components/sections/navbar/default";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dylanki",
  description: "Anki clone for dylan. Happy birthday!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <header className="header w-full fixed">
          <div className="container mx-auto">
            <Navbar className="w-full"/>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
