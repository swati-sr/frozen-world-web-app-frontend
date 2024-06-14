import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Frozen World",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-baseOne">
        <Header />
        {children}
      </body>
    </html>
  );
}
