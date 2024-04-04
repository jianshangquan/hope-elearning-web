"use client";

import {
  DrawerBackdrop,
  DrawerContent,
  DrawerContextProvider,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import SideMenu from "./side-menu";
import Header from "./header";
import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin/posts/")) {
    return <div className="p-4 lg:p-5">{children}</div>;
  }

  return (
    <DrawerContextProvider>
      <div className="flex h-full relative">
        <SideMenu />
        <DrawerContent className="mt-[65px]">
          <Header />
          <div className="p-4 lg:p-5">{children}</div>
        </DrawerContent>
        <DrawerBackdrop />
      </div>
    </DrawerContextProvider>
  );
}
