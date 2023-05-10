import useWindowDimensions from "@/hooks/useWindowDimentions";
import { DesktopMenu } from "./ui/DesktopMenu";
import { MobileMenu } from "./ui/MobileMenu";
import { useEffect, useState } from "react";



export const Header = () => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const { width } = useWindowDimensions()

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);


  if (!width || !initialRenderComplete) return (
    <header className="fixed top-0 w-full h-[80px] bg-white flex justify-between items-center px-5 lg:px-10">
      <div className="text-4xl font-bold">
      sportclub        
      </div>
      <div className="w-10"></div>
    </header>
  )

  return (
    <header className="fixed top-0 w-full h-[80px] bg-white flex justify-between items-center px-5 lg:px-10">
      <div className="text-4xl font-bold">
        sportclub        
      </div>
      {
        width > 1200 ? (<DesktopMenu />) : (<MobileMenu />) 
      }
    </header>
  )
}
