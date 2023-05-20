import { type Dispatch, type FC, type SetStateAction, memo, useEffect, useState, type ChangeEvent } from "react"
import { toast } from "react-hot-toast"
import { Loader } from "@/components/Loader"
import { addDays, checkIsValid, dateToRender, formatDate } from "@/utils/date-helpers"

type DatePickerProps = {
  startDate: string
  abonementDuration: number
  setStartDate: Dispatch<SetStateAction<string>>
}

export const DatePicker: FC<DatePickerProps> = memo(({ startDate, abonementDuration, setStartDate }) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (!initialRenderComplete) {
    return (<Loader />)
  }

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setStartDate(formatDate(new Date()))
      return
    }
    
    const current = new Date()
    const changedDate = new Date(e.currentTarget.value)

    if (!checkIsValid(current, changedDate)) {
      toast.error('Некорректна дата')
      return  
    }

    setStartDate(e.currentTarget.value)
  }

  return (
    <div className="text-p flex flex-col py-2 mt-5">
      <span className="mb-2">оберіть початкову дату:</span>
      <div className="flex flex-col gap-2">
        <input className="w-full lg:w-[250px] outline-none text-xs border rounded-[5px] py-3 px-5 lg:py-2" type="date" value={startDate} onChange={handleChangeDate}/>
        <div className="text-xs px-3">запис можна здійснювати не більше ніж на 7 днів уперед</div>
        {startDate !== '' && (<div className="text-xs px-3 text-green-600">дійсний до <span className=" whitespace-nowrap">{dateToRender(addDays(startDate, abonementDuration))}</span></div>)}
      </div>
    </div>
  )
}) 
