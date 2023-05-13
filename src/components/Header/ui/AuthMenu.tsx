import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { type FC } from "react";

export const AuthMenu: FC = () => {
  const { data: sessionData } = useSession();

  const handleSignIn = () => {
    void signIn()
  }

  const handleSignOut = () => {
    void signOut()
  }


  return (
    <div className="flex items-center justify-center gap-5">
      <p className="text-center text-l font-bold text-black">
        {sessionData && <span className="font-bold text-p">{sessionData.user?.name}</span>}
      </p>
      {sessionData ? 
        <Button onClick={handleSignOut}>вийти</Button>
        : 
        <Button onClick={handleSignIn}>увійти</Button>
      }
    </div>
  );
};