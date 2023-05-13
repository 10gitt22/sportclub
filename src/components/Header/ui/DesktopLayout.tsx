
import { type ReactNode, type FC } from "react"
import Link from "next/link"

type DesktopLayoutProps = {
  children: ReactNode
}

export const DesktopLayout: FC<DesktopLayoutProps> = ({children}) => {
  return (
    <div className="flex items-center gap-5 text-l font-normal">
      <nav className="flex gap-5">
        <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#intro'} scroll={false}>головна</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#about'} scroll={false}>про нас</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#trainers'} scroll={false}>тренери</Link>
        <Link className="hover:text-teal-500 transition-colors duration-200" href={'/#abonements'} scroll={false}>абонементи</Link>
      </nav>
      { children }
    </div>
  )
}