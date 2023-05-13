import { useState, type FC, useRef, memo } from "react";
import { type Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/ui/Button";

import { useOutsideAlerter } from "@/hooks/useOutsideAlerter";

type MenuDropdownProps = {
  user: Session['user']
}

const MenuDropdown: FC<MenuDropdownProps> = memo(({ user }) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const container = useRef(null)
  useOutsideAlerter({ ref: container, callback: () => setMenuOpened(false) })
  
  const toggleUserMenu = () => {
    setMenuOpened(prev => !prev)
  }

  return (
    <div 
      className="flex items-center justify-center hover:cursor-pointer gap-2 relative"
      onClick={toggleUserMenu}
      ref={container}
    >
      <span className="max-[500px]:hidden font-medium">{user.email}</span>
      <div className="flex">
        {
          user.image ? (
            <div className={`w-[30px] h-[30px] md:w-[40px] md:h-[40px] bg-cover rounded-[40px]`} style={{ backgroundImage: `url(${user.image})` }}></div>
          ) : (
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  rounded-[40px]"></div>
          )
        }
      </div>
      {
        menuOpened && (
          <div className="absolute z-10 min-w-[200px] max-[500px]:mr-10 flex flex-col border border-black top-full bg-white shadow-md mt-5 rounded-[5px] w-full">
            <Link className="px-5 py-4 rounded-t-[5px] transition-colors border-b hover:bg-primary" href="/user/profile">профіль</Link>
            <Link className="px-5 py-4 rounded-b-[5px] transition-colors hover:bg-primary" href="/user/appointments">мої тренування</Link>
          </div>
        )
      }
    </div>
  )
})

export const UserMenu: FC = () => {
  const { data: sessionData } = useSession();
  
  const handleSignIn = () => {
    void signIn()
  }

  const handleSignOut = () => {
    void signOut()
  }


  return (
    <div className="flex items-center justify-center gap-5">
      {sessionData ? 
        <>
          <MenuDropdown user={sessionData.user} />
          <Button onClick={handleSignOut}>вийти</Button>
        </>
        : 
        <Button onClick={handleSignIn}>увійти</Button>
      }
    </div>
  );
};