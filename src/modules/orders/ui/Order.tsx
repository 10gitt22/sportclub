import { type Client, type Abonement, type Trainer } from "@prisma/client";
import { useState, type FC, useEffect } from "react";
import { TrainerPicker } from "./TrainerPicker";
import { addDays, formatDate } from "@/utils/date-helpers";
import { Button } from "@/ui/Button";
import { DatePicker } from "./DatePicker";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

type OrderProps = {
  profile: Client
  abonement: Abonement 
  trainers: Trainer[]
}

export const Order: FC<OrderProps> = ({ profile, abonement, trainers }) => {
  const { push } = useRouter()
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [startDate, setStartDate] = useState(formatDate(new Date()))
  const [endDate, setEndDate] = useState(addDays(startDate, abonement.duration))
  const { mutate, isLoading: creatingAppointment } = api.appointment.createAppointment.useMutation({
    onSuccess: () => {
      toast.success("Запис створено успішно!")
      void push('/profile')
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })


  useEffect(() => {
    setEndDate(addDays(startDate, abonement.duration))
  }, [startDate])

  const handleSubmit = () => {
    if (abonement.trainerIncluded && !selectedTrainer) {
      toast.error('Оберіть тренера!')
      return
    }
    const appointmentData = {
      clientId: profile.id,
      abonementId: abonement.id,
      trainerId: selectedTrainer?.id || null,
      startDate,
      endDate
    }
    mutate(appointmentData)
  }

  return (
    <div className="lg:w-[55%] m-auto">
      <h1 className="text-h3 border-b-8 border-primaryDarken w-fit">{abonement.abonementName}</h1>
      <div className="mt-5">
        <div className="text-p py-2">кількість занять: <span className="text-4xl font-bold">{abonement.sessionsCount}</span></div>
        <div className="text-p py-2">тривалість дії абонементу: <span className="text-4xl font-bold whitespace-nowrap">{abonement.duration} дні(в)</span></div>
        <div className="text-xs ">Протягом {abonement.duration} днів ви можете відвідати {abonement.sessionsCount} {abonement.sessionsCount === 1 ? 'заняття' : 'занять'}. Після того, як Ви відтренували всі заняття абонементу чи строк його дії закінчився, запис стає не дійсним </div>

        {abonement.trainerIncluded && <TrainerPicker trainers={trainers} selectedTrainer={selectedTrainer} setSelectedTrainer={setSelectedTrainer}/>}
        <DatePicker startDate={startDate}  setStartDate={setStartDate} abonementDuration={abonement.duration}/>
        <div className="flex items-center justify-between border-t-2 mt-5 border-black/10 py-10">
          <div className="flex items-center gap-5 text-p">до сплати: <span className="font-bold block text-4xl">{abonement.price} грн</span></div>
          <Button className="min-w-[150px]" onClick={handleSubmit} disabled={creatingAppointment}>{creatingAppointment ? '...' : 'оплатити'}</Button>
        </div> 
      </div>
    </div>
  )
}
