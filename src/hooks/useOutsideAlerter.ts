import { useEffect } from 'react'

type OutsideAlerterProps = {
  ref: React.MutableRefObject<HTMLElement | null>
  callback: () => void
}

export function useOutsideAlerter ({ ref, callback }: OutsideAlerterProps) {
  useEffect(() => {
    function handleClickOutside (event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
