import { type FC, useState, type ReactNode } from "react"
import Link from "next/link"

type MenuProps = {
  closeMenu: () => void
}

const Menu: FC<MenuProps> = ({ closeMenu }) => {
  return (
    <div className="absolute top-[80px] left-0 h-[calc(100vh_-_80px)] px-5 lg:px-10 w-full bg-white">
      <nav className="flex flex-col text-h3 mt-20 gap-10">
        <Link className="hover:text-teal-500 transition-colors duration-200" onClick={closeMenu} href={'/#intro'} scroll={false}>головна</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" onClick={closeMenu} href={'/#about'} scroll={false}>про нас</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" onClick={closeMenu} href={'/#trainers'} scroll={false}>тренери</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" onClick={closeMenu} href={'/#abonements'} scroll={false}>абонементи</Link>
      </nav>
    </div>
  )
}



type MobileLayoutProps = {
  children: ReactNode
}

export const MobileLayout: FC<MobileLayoutProps> = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false)

  const closeMenu = () => {
    setMenuOpened(false)
  }

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
  }

  return (
    <div className="flex items-center gap-5 text-l">
      <div className="font-medium hover:cursor-pointer" onClick={toggleMenu}>{menuOpened ? "закрити" : "меню"}</div>
      { children }
      {menuOpened && <Menu closeMenu={closeMenu}/>}
    </div>
  )
}
