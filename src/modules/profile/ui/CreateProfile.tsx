import { useMemo } from "react"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import { type CreateProfilePageProps } from "@/layouts/ProfilePageLayout"

import { type Profile } from "../lib/schema"
import { ProfileForm } from "./ProfileForm"

import splitDisplayName from "@/utils/split-display-name"
import { api } from "@/utils/api"

export const CreateProfile = ({ ...props }) => {
  const { user, profile, refetch } = props as CreateProfilePageProps
  const { firstName, lastName } = splitDisplayName(user.name)
  const { push, query } = useRouter()

  const initProfile: Profile = useMemo(() => {
    return {
      email: user.email || '',
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: "+380"
    }
  }, [user, firstName, lastName])

  const { mutate, isLoading: creatingProfile } = api.profile.createProfile.useMutation({
    onSuccess: async () => {
      toast.success("Профіль створено успішно!")
      if (query.redirectToPath) {
        void push(`/${query.redirectToPath as string}`)  
      } else {
        void push('/')
      }

      await refetch()
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  const createProfile = (values: Profile) => {
    mutate({ 
      ...values,
      userId: user.id,
      profileImage: user.image || null
    })
  }


  if (profile && query.redirectToPath) {
    void push(`/${query.redirectToPath as string}`)
    return <></>
  }

  if (profile) {
    void push('/profile')
    return <></>
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-h1">sportclub</h1>
        <p className="text-p">заповніть профіль 💁‍♂️</p>
        <ProfileForm profile={initProfile} saving={creatingProfile} onSave={createProfile}/>
      </div>
    </div>
  )
}
