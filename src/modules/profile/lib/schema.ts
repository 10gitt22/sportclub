import { type TypeOf, z } from "zod";

export const profileSchema = z.object({
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

export type Profile = TypeOf<typeof profileSchema>