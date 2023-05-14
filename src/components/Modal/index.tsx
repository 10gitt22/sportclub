import React, { useRef, type FC, type ReactNode } from 'react'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'

type ModalProps = {
  children: ReactNode,
  closeModal: () => void
}

export const Modal: FC<ModalProps> = ({ children, closeModal }) => {
  const container = useRef(null) 
  useOutsideAlerter({ ref: container, callback: closeModal })


  return (
    <div className='bg-black/50 fixed top-0 left-0 w-full h-screen z-20 flex items-center justify-center p-5 lg:p-10'>
      <div className='bg-white px-10 py-20 rounded-[10px] w-[60%] min-w-[250px] max-w-[700px]' ref={container}>
        {children}
      </div>
    </div>
  )
}
