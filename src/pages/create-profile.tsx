import { useEffect, type FC, memo } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

import {  toast } from 'react-hot-toast'
import { Loader } from "@/components/Loader";

import { api } from "@/utils/api";
import { useFormik } from "formik";

import { type Session } from "next-auth";
import { type Client } from "@prisma/client";
import { Input } from "@/ui/Input";


type ProfileFormProps = {
  user: Session['user']
}

type ClientToCreate = Omit<Client, "userId" | "id">

const ProfileForm: FC<ProfileFormProps> = memo(({ user }) => {  
  const { push } = useRouter() 
  const {mutate, isLoading: creatingProfile} = api.profile.createProfile.useMutation({
    onSuccess: () => {
      toast.success("Профіль успішно створено!")
      void push('/')
    }
  })

  const { values, handleChange, handleSubmit } = useFormik<ClientToCreate>({
    initialValues: {
      email: user.email || '',
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },
    onSubmit: (values) => {
      console.log(values, "VALUES");
      mutate({ 
        ...values,
        userId: user.id
      })
      return 
    }
  })

  return (
    <form className="flex flex-col w-full gap-10 mt-5" onSubmit={handleSubmit}>
      <Input type="text" name="firstName" placeholder="ім'я" value={values.firstName} onChangeFormik={handleChange} required/>
      <Input type="text" name="lastName" placeholder="прізвище"  value={values.lastName} onChangeFormik={handleChange} required/>
      <Input type="email" name="email" placeholder="пошта" disabled value={values.email} onChangeFormik={handleChange} required/>
      <Input type="tel" name="phoneNumber" placeholder="номер телефону" value={values.phoneNumber} onChangeFormik={handleChange} required/>
      <button className="bg-black py-3 rounded-[5px] font-medium text-button text-white" disabled={creatingProfile} type="submit">{creatingProfile ? "cтворюємо..." : "зберегти"}</button>
    </form>
  )
})


const Profile = () => {
  const { data: sessionData, status } = useSession()
  const { data: profile, isLoading } = api.profile.getProfile.useQuery()

  const { push } = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {    
      toast.error('401: Ви не авторизовані')
      void push('/')
      return
    }
  }, [status])

  if (isLoading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    )
  }

  if(profile) {
    void push('/')
    return
  }

  return ( 
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-h1">sportclub</h1>
        <p className="text-p">заповніть профіль 💁‍♂️</p>
        <ProfileForm user={sessionData!.user}/>
      </div>
    </div>
  )
}

export default Profile






// if (!data) {
//   return (
//     <div className="flex justify-center items-center h-screen w-full">
//       <div className="flex flex-col items-center">
//         <h1 className="text-h1">404</h1>
//         <span className="text-descriptor">користувача не знайдено 🤷‍♂️</span>
//       </div>
//     </div>
//   )
// } 
  