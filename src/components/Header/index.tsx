import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/ui/Button";
import Link from "next/link";

const AuthMenu: React.FC = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  
  return (
    <div className="flex items-center justify-center gap-5">
      <p className="text-center text-l font-bold text-black">
        {sessionData && <span>{sessionData.user?.email}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "вийти" : "увійти"}
      </Button>
    </div>
  );
};


export const Header = () => {

  return (
    <header className="fixed top-0 w-full h-[80px] bg-white flex justify-between items-center px-5 lg:px-10">
      <div className="text-4xl font-bold">
        sportclub        
      </div>
      <div className="flex items-center gap-5 text-l font-normal">
        <nav className="flex gap-5">
          <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#intro'} scroll={false}>головна</Link>
          <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#about'} scroll={false}>про нас</Link>
          <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#trainers'} scroll={false}>тренери</Link>
          <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#trainers'} scroll={false}>абонементи</Link>
        </nav>
        <AuthMenu />
      </div>
    </header>
  )
}
