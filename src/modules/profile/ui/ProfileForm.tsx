import { type FC, memo } from "react"

import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { type Profile, profileSchema } from "../lib/schema"

import { Input } from "@/ui/Input"

type ProfileFormProps = {
  profile: Profile
  saving: boolean
  onSave: (values: Profile) => void
}

export const ProfileForm: FC<ProfileFormProps> = memo(({ profile, saving, onSave}) => {  
  const { values, errors, handleChange, handleSubmit } = useFormik<Profile>({
    initialValues: profile,
    validationSchema: toFormikValidationSchema(profileSchema),
    onSubmit: (values) => {
      onSave(values)
      return 
    },
    enableReinitialize: true
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
        minLength={10} 
        maxLength={13} 
        required
      />  
      <button className="bg-black py-3 rounded-[5px] font-medium text-button text-white" disabled={saving} type="submit">{saving ? "зберігаємо..." : "зберегти"}</button>
    </form>
  )
})