import { type Dispatch, type FC, type SetStateAction } from "react"
import { type Trainer } from "@prisma/client"

type TrainerPickerProps = {
  trainers: Trainer[]
  selectedTrainer: Trainer | null
  setSelectedTrainer: Dispatch<SetStateAction<Trainer | null>>
}

export const TrainerPicker: FC<TrainerPickerProps> = ({ trainers, selectedTrainer, setSelectedTrainer }) => {
  return (
    <div className="flex flex-col py-2 mt-5 gap-2">
      <div className="text-p py-2">оберіть тренера:</div>
      <div className="flex gap-10  flex-wrap">
        {trainers.map((trainer) => {
          return (
            <div className={`flex flex-col items-center ${selectedTrainer?.id === trainer.id ? 'border-green-500' : 'border-black/10'}  hover:shadow-xl hover:cursor-pointer border hover:border hover:border-green-800 py-5 px-2 transition-all rounded-[10px]`} key={trainer.id} onClick={() => setSelectedTrainer(trainer)}>
              <div 
                className="w-[150px] h-[150px] bg-cover bg-center rounded-[100%]  mb-5 "
                style={{backgroundImage: `url(${trainer.trainerImage})`}}
              ></div>
              <span className="text-l font-bold">{trainer.firstName + " " + trainer.lastName}</span>
              <span>{trainer.days}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}