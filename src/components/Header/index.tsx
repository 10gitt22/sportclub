import { useEffect, useState } from "react";
import Link from "next/link";

import { DesktopLayout } from "./ui/DesktopLayout";
import { MobileLayout } from "./ui/MobileLayout";
import { UserMenu } from "./ui/UserMenu";

import useWindowDimensions from "@/hooks/useWindowDimentions";

export const Header = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const { width } = useWindowDimensions()

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);


  if (!width || !initialRenderComplete) return (
    <header className="fixed z-[2] top-0 w-full h-[80px] bg-white flex justify-between items-center px-5 lg:px-10">
      <div className="text-4xl font-bold">
        <Link href={'/'}>sportclub</Link>      
      </div>
      <div className="w-2"></div>
    </header>
  )

  return (
    <header className="fixed top-0 z-[2] w-full h-[80px] bg-white flex justify-between items-center px-5 lg:px-10">
      <div className="text-4xl font-bold">
        <Link href={'/'}>sportclub </Link>         
      </div>
      {
        width > 1200 ? 
          (<DesktopLayout ><UserMenu /></DesktopLayout>) : 
          (<MobileLayout ><UserMenu /></MobileLayout>) 
      }
    </header>
  )
}
