import { TailSpin } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <TailSpin 
        height="80"
        width="80"
        color='#222'
      />
    </div>
  )
}
