import { type Abonement, type Trainer } from "@prisma/client";
import { useState, type FC, useEffect } from "react";
import { TrainerPicker } from "./TrainerPicker";
import { addDays, formatDate } from "@/utils/date-helpers";
import { Button } from "@/ui/Button";
import { DatePicker } from "./DatePicker";

type OrderProps = {
  abonement: Abonement
  trainers: Trainer[]
}

export const Order: FC<OrderProps> = ({ abonement, trainers }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [startDate, setStartDate] = useState(formatDate(new Date()))
  const [endDate, setEndDate] = useState(addDays(startDate, abonement.duration))

  useEffect(() => {
    setEndDate(addDays(startDate, abonement.duration))
  }, [startDate])

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
          <Button onClick={() => {
            console.log({
              startDate,
              endDate, 
              selectedTrainer
            });
          }}>оплатити</Button>
        </div> 
      </div>
    </div>
  )
}
