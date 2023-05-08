import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/ui/Button";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  
  return (
    <div className="flex items-center justify-center gap-5">
      <p className="text-center text-p text-white">
        {sessionData && <span>{sessionData.user?.email}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Вийти" : "Увійти"}
      </Button>
    </div>
  );
};


export const Header = () => {
  return (
    <header className="fixed top-0 w-full h-[80px] bg-black flex justify-between items-center px-10 border-b border-b-borderDark">
      <div className="text-4xl font-medium">sportclub</div>
      <AuthShowcase />
    </header>
  )
}
