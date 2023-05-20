import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import Link from "next/link"

import { type ProfilePageProps } from "@/layouts/ProfilePageLayout"
import { Modal } from "@/components/Modal"
import { ProfileForm } from "./ProfileForm"

import { type Profile as ToUpdateProfile } from "../lib/schema"

import { api } from "@/utils/api"
import { UserTrainings } from "./UserTrainings"

export const Profile = ({ ...props }) => { 
  const [editOpened, setEditOpened] = useState(false)
  const { profile, refetch } = props as ProfilePageProps
  const { mutate, isLoading: updatingProfile } = api.profile.updateProfile.useMutation({
    onSuccess: async () => {
      await refetch()
      toast.success("Профіль оновлено успішно!")
      closeEditModal()
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })
  const utils = api.useContext()

  const { push } = useRouter()

  const openEditModal = () => {
    setEditOpened(true)
  }

  const closeEditModal = () => {
    setEditOpened(false)
  }

  const updateProfile = (values: ToUpdateProfile) => {
    mutate({ 
      ...values
    })
  }

  if (!profile) {
    void push('/profile/create')
    return <></>
  }

  const { data: appointments, isLoading } = api.appointment.getAppointments.useQuery(profile.id) 

  const refetchAppointments = () => {
    return utils.appointment.getAppointments.invalidate()
  }

  return (
    <div className="py-10 px-10">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="flex mt-0 flex-col m-auto md:ml-0 overflow-hidden py-10 w-full min-w-[250px] max-w-[400px] md:w-auto">
          {profile.profileImage ? (
            <div 
              className="w-[150px] h-[150px] self-center bg-black md:self-start md:w-[200px] md:h-[200px] rounded-[220px] bg-cover bg-center"
              style={{backgroundImage: `url(${profile.profileImage})`}}
            ></div>
          ) : (
            <div 
              className="flex items-center justify-center text-white bg-black w-[200px] h-[200px] rounded-[200px]"
            >немає фото:(</div>
          )}
          <h3 className="text-h3 mt-5 w-full  whitespace-pre-wrap">{`${profile.firstName} ${profile.lastName}`}</h3>
          <p className="text-p">{profile.email}</p>
          <p className="text-descriptor font-light">{profile.phoneNumber}</p>
          <button className="w-full border border-black px-10 py-2 mt-5 text-button rounded-[5px] hover:bg-black hover:text-white whitespace-nowrap transition-colors" onClick={openEditModal}>редагувати профіль</button>

        </div>
        <UserTrainings appointments={appointments} loading={isLoading} refetch={refetchAppointments}/>
      </div>
      {
        editOpened && (
          <Modal closeModal={closeEditModal}>
            <h3 className="text-4xl ">редагування профілю:</h3>
            <ProfileForm profile={profile} saving={updatingProfile} onSave={updateProfile}/>
          </Modal>
        )
      }
    </div>
  )
}
