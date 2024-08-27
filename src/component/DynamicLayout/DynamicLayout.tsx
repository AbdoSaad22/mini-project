"use client";

import { usePathname } from "next/navigation";
import Header from "@/component/header/Header";

const DynamicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideHeaderOnPages = ["/login", "/register"];

  return (
    <>
      {!hideHeaderOnPages.includes(pathname) && <Header />}
      {children}
    </>
  );
};

export default DynamicLayout;
