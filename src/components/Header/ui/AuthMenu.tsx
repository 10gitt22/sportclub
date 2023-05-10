import { Button } from "@/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { type FC } from "react";

export const AuthMenu: FC = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  
  return (
    <div className="flex items-center justify-center gap-5">
      <p className="text-center text-l font-bold text-black">
        {sessionData && <span className="font-bold text-p">{sessionData.user?.name}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "вийти" : "увійти"}
      </Button>
    </div>
  );
};
