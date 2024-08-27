import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F C I - Admin Dashboard",
  description:
    "Welcome to the FCI College Website - your go-to platform for seamless communication, resource access, and updates for students, faculty, and staff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
