import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import DynamicLayout from "../component/DynamicLayout/DynamicLayout";

const inter = Inter({ subsets: ["latin"] });
const kufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "F C I",
  description:
    "Welcome to the FCI College Website - your go-to platform for seamless communication, resource access, and updates for students, faculty, and staff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kufiArabic.className}>
        <DynamicLayout>{children}</DynamicLayout>
      </body>
    </html>
  );
}
