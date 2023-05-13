import { useEffect, type FC, memo } from "react";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

import { useFormik } from "formik";
import { type TypeOf, z } from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { toast } from 'react-hot-toast'
import { Loader } from "@/components/Loader";
import { Input } from "@/ui/Input";

import { api } from "@/utils/api";


const createProfileSchema = z.object({
  firstName: 
    z.string()
      .regex(new RegExp(/^[a-zA-Zа-яА-ЯіІєЄїЇ-\s]+$/), 'дозволені тільки літери'),
  lastName: 
    z.string()
      .regex(new RegExp(/^[a-zA-Zа-яА-ЯіІєЄїЇ-\s]+$/), 'дозволені тільки літери'),
  phoneNumber: 
    z.string()
      .regex(new RegExp(/^[+0-9]+$/), 'некоректно введені дані')
      .min(10, 'мінімально 10 символів')
      .max(13, 'максимально 13 символів'),
  email: z.string(),
})

const splitDisplayName = (name: string | null | undefined) => {
  if (!name) {
    return { firstName: undefined,  lastName: undefined}
  }
  const [firstName, lastName] = name.split(' ')
  return { firstName, lastName }
}


type ProfileFormProps = {
  user: Session['user']
}
type ClientToCreate = TypeOf<typeof createProfileSchema>

const ProfileForm: FC<ProfileFormProps> = memo(({ user }) => {  
  const { push } = useRouter() 
  const { firstName, lastName } = splitDisplayName(user.name)
  

  const {mutate, isLoading: creatingProfile} = api.profile.createProfile.useMutation({
    onSuccess: () => {
      toast.success("Профіль створено успішно!")
      void push('/')
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  const { values, errors, handleChange, handleSubmit } = useFormik<ClientToCreate>({
    initialValues: {
      email: user.email || '',
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: "+380"
    },
    validationSchema: toFormikValidationSchema(createProfileSchema),
    onSubmit: (values) => {
      mutate({ 
        ...values,
        userId: user.id
      })
      return 
    }
  })
  return (
    <form className="flex flex-col w-full gap-10 mt-5" onSubmit={handleSubmit}>
      <Input 
        type="text" 
        id={'firstName'} 
        error={errors.firstName ? errors.firstName : undefined} 
        name="firstName" 
        autoComplete="off" 
        placeholder="ім'я" 
        value={values.firstName} 
        onChangeFormik={handleChange} 
        required
      />
      <Input 
        type="text" 
        id={'lastName'}
        error={errors.lastName ? errors.lastName : undefined}
        name="lastName" 
        autoComplete="off" 
        placeholder="прізвище" 
        value={values.lastName} 
        onChangeFormik={handleChange} 
        required
      />
      <Input 
        type="email"
        id={'email'} 
        error={errors.email ? errors.email : undefined}
        name="email" 
        placeholder="пошта"
        disabled 
        value={values.email} 
        onChangeFormik={handleChange}
        required
      />
      <Input 
        type="tel"
        id={'phoneNumber'} 
        error={errors.phoneNumber ? errors.phoneNumber : undefined} 
        name="phoneNumber"
        placeholder="номер телефону"
        autoComplete="off" 
        value={values.phoneNumber} 
        onChangeFormik={handleChange}
        minLength={11} 
        maxLength={13} 
        required
      />  
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

  return ( 
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-h1">sportclub</h1>
        <p className="text-p">заповніть профіль 💁‍♂️</p>
        <ProfileForm user={sessionData.user}/>
      </div>
    </div>
  )
}

export default Profile


