import { useState, type FC, useRef, memo } from "react";
import { type Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/ui/Button";

import { useOutsideAlerter } from "@/hooks/useOutsideAlerter";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";

type MenuDropdownProps = {
  user: Session['user']
}

const MenuDropdown: FC<MenuDropdownProps> = memo(({ user }) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const { push } = useRouter()
  const container = useRef(null)
  useOutsideAlerter({ ref: container, callback: () => setMenuOpened(false) })
  
  const toggleUserMenu = () => {
    setMenuOpened(prev => !prev)
  }

  const handleSignOut = async () => {
    void await push('/')
    void signOut()
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
            <div className={`w-[30px] h-[30px] md:w-[40px] flex items-center justify-center md:h-[40px] bg-cover bg-[#222] rounded-[40px]`} style={{ backgroundImage: `url(${user.image})` }}></div>
          ) : (
            <div className="w-[30px] h-[30px] text-white flex items-center justify-center md:w-[40px] md:h-[40px] bg-[#222] rounded-[40px]">{user.name ? user.name[0]?.toUpperCase() : '🙎‍♂️'}</div>
          )
        }
      </div>
      {
        menuOpened && (
          <div className="absolute z-20 min-w-[200px] max-[500px]:mr-[175px] flex flex-col border border-black top-full bg-white shadow-md mt-5 rounded-[5px] w-full">
            <Link className="px-5 py-4 rounded-t-[5px] transition-colors border-b hover:bg-primary" href="/profile">мій профіль</Link>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <div className="px-5 py-4 rounded-b-[5px] transition-colors hover:bg-primary" onClick={handleSignOut}>вийти</div>
          </div>
        )
      }
    </div>
  )
})

export const UserMenu: FC = () => {
  const { data: sessionData, status } = useSession();
  
  const handleSignIn = () => {
    void signIn()
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-5">
        <ThreeDots 
          width={20}
          height={20}
          color="#222"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-5">
      {sessionData ? 
        <MenuDropdown user={sessionData.user} />
        : 
        <Button onClick={handleSignIn}>увійти</Button>
      }
    </div>
  );
};