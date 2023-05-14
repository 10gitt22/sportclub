import { useEffect, type FC, type ReactElement, isValidElement, cloneElement} from "react"
import { type Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"

import { Loader } from "@/components/Loader"

import { api } from "@/utils/api"
import { type Client } from "@prisma/client"

type ProfilePageLayoutProps = {
  children: ReactElement
}

export type ProfilePageProps = {
  user: Session['user']
  profile: Client
  refetch: () => Promise<void>
}

export type CreateProfilePageProps = {
  user: Session['user']
  profile: Client | null
  refetch: () => Promise<void>
}

type ChildrenProps = ProfilePageProps | CreateProfilePageProps


function addPropsToReactElement(element: ReactElement, props: ChildrenProps) {
  if (isValidElement(element)) {
    return cloneElement(element, props)
  }
  return element
}

export const ProfilePageLayout: FC<ProfilePageLayoutProps> = ({ children }) => {
  const { data: sessionData, status } = useSession()
  const { data: profile, isLoading } = api.profile.getProfile.useQuery()
  const utils = api.useContext()

  const { push } = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {    
      toast.error('401: Ви не авторизовані')
      void push('/')
      return
    }
  }, [status])

  const refetchProfile = () => {
    return utils.profile.getProfile.invalidate()
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    )
  }

  if (!sessionData?.user.email) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-h1">404</h1>
          <span className="text-descriptor">користувача не знайдено 🤷‍♂️</span>
        </div>
      </div>
    )
  }

  const childrenWithProps = addPropsToReactElement(children, { user: sessionData.user, profile: profile || null, refetch: refetchProfile })
  
  return (
    <>{childrenWithProps}</>
  )
}
