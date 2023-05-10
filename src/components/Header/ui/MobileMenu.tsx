import Link from "next/link"
import { type FC, useState } from "react"
import { AuthMenu } from "./AuthMenu"

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

export const MobileMenu = () => {
  const [menuOpened, setMenuOpened] = useState(true)

  const closeMenu = () => {
    setMenuOpened(false)
  }

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
  }

  return (
    <div className="flex items-center gap-5 text-l">
      <div className="font-medium" onClick={toggleMenu}>меню</div>
      <AuthMenu />
      {menuOpened && <Menu closeMenu={closeMenu}/>}
    </div>
  )
}
