import { type Dispatch, type FC, type SetStateAction, memo, useEffect, useState } from "react"
import { Loader } from "@/components/Loader"
import { addDays, dateToRender } from "@/utils/date-helpers"

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

  return (
    <div className="text-p flex flex-col py-2 mt-5">
      <span className="mb-2">оберіть початкову дату:</span>
      <div className="flex flex-col  gap-2">
        <input className="lg:w-[250px] outline-none text-xs border rounded-[5px] py-3 px-5 lg:py-2" type="date" value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
        {startDate !== '' && (<div className="text-xs px-3 text-green-600">дійсний до <span className=" whitespace-nowrap">{dateToRender(addDays(startDate, abonementDuration))}</span></div>)}
      </div>
    </div>
  )
}) 
