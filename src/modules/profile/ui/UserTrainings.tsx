import { Loader } from "@/components/Loader";
import { api } from "@/utils/api";
import { dateToRender } from "@/utils/date-helpers";
import { type Abonement, type Appointment, type Client, type Trainer } from "@prisma/client";
import Link from "next/link";
import { type FC } from "react";
import { toast } from "react-hot-toast";

type UserTrainingsProps = {
  appointments: (Appointment & {
    client: Client;
    trainer: Trainer | null;
    abonement: Abonement;
})[] | undefined
  loading: boolean
  refetch: () => Promise<void>
}

export const UserTrainings: FC<UserTrainingsProps> = ({appointments, loading, refetch}) => {

  const { mutate, isLoading: deleting } = api.appointment.deleteAppointment.useMutation({
    onSuccess: async () => {
      await refetch()
      toast.success('Ваш запис видалено успішно! Кошти будуть повернені протягом 24ох годин', {
        duration: 5000
      })
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })


  if (loading) {
    return (
      <div className="h-full border-t flex-grow lg:border-none py-10 lg:mt-0 lg:pl-10">
        <Loader />
      </div>
    )
  }

  if (!appointments) {
    return <></>
  }

  if (appointments.length <= 0) {
    return (
      <div className="h-full border-t flex-grow lg:border-none py-10 lg:mt-0 lg:pl-10">
        <h3 className="text-4xl">мої тренування:</h3>
        <div className="mt-5 text-p font-light">ще нема тренувань 🤷‍♂️</div>
        <Link href={'/#abonements'} className="text-p block mt-10 underline">записатися {'->'}</Link>
      </div>
    )
  }

  return (
    <div className="h-full border-t flex-grow lg:border-none py-10 lg:mt-0 lg:pl-10">
      <h3 className="text-4xl font-normal">мої тренування:</h3>
      <div className="mt-10">{
        appointments.map(appointment => {
          return (
            <div key={appointment.id} className="min-h-[200px] flex flex-col items-start mt-5 py-5 px-5 gap-5 lg:items-center lg:flex-row justify-between border border-black/20 rounded-[10px]">
              <div className="flex flex-grow flex-col gap-10">
                <div className="text-4xl font-bold items-start flex-col gap-2 lg:flex-row lg:items-center lg:gap-5 flex ">
                  <span className="whitespace-nowrap" >{appointment.abonement.abonementName} </span>
                  <span className="font-light text-2xl whitespace-nowrap">{appointment.abonement.sessionsCount} {appointment.abonement.sessionsCount === 1 ? 'заняття' : 'занять'}</span> 
                  <span className="flex gap-5 font-normal whitespace-nowrap"><div className="text-3xl font-bold">{appointment.abonement.price} грн</div></span> 
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  {appointment.trainer ? (
                    <Link href={'/#trainers'}>
                      <div className="flex gap-2 items-center">
                        <div className={`w-[30px] h-[30px] md:w-[40px] flex items-center justify-center md:h-[40px] bg-cover bg-center bg-[#222] rounded-[40px]`} style={{ backgroundImage: `url(${appointment.trainer.trainerImage})` }}></div>
                        <span className="text-descriptor">{`${appointment.trainer?.firstName} ${appointment.trainer?.lastName} (${appointment.trainer.days})`}</span>
                      </div>
                    </Link>
                  ) :
                    (
                      <div className="text-descriptor">без тренера</div>
                    )
                  } 
                  <div className="flex gap-2 flex-wrap text-descriptor text-green-600">
                    <span>від {dateToRender(appointment.startDate)}</span>
                    <span>до {dateToRender(appointment.endDate)}</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-fit flex justify-end">
                <button className="py-2 px-5 rounded-[5px] whitespace-nowrap hover:bg-red-100 transition-colors" disabled={deleting} onClick={() => mutate(appointment.id)}>скасувати ❌</button>
              </div>
            </div>
          )
        })
      }</div>
    </div>
  )
}
