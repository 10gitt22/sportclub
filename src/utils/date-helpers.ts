export function formatDate(date: Date) {
  return date.toLocaleDateString('en-CA')
}

export function dateToRender(date: string) {
  //input format: yyyy-mm-dd
  return date.split('-').reverse().join('.')
}

export function addDays(startDate: string, days: number)  {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days)
  return formatDate(date)  
}


