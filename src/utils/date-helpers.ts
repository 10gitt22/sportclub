export function formatDate(date: Date) {
  return date.toLocaleDateString('en-CA')
}

export function dateToRender(date: string) {
  //input format: yyyy-mm-dd
  return date.split('-').reverse().join('.') // dd.mm.yyyy
}

export function addDays(startDate: string, days: number)  {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days)
  return formatDate(date)  
}

export function checkIsValid(currentDate: Date, changedDate: Date) {
  const current = currentDate.getUTCFullYear() + currentDate.getUTCMonth() + currentDate.getUTCDate()
  const changed = changedDate.getUTCFullYear() + changedDate.getUTCMonth() + changedDate.getUTCDate()

  console.log(changedDate.getUTCFullYear(), changedDate.getUTCMonth(), changedDate.getUTCDate());
  
  const differenceInDays = changed - current

  return differenceInDays >= 0 && differenceInDays <= 7
} 