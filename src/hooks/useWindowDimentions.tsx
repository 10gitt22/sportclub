import { useState, useEffect } from 'react'

interface WindowDimentions {
  width: number | null
  height: number | null
}
export default function useWindowDimensions (): WindowDimentions {
  const hasWindow = typeof window !== 'undefined';
  
  function getWindowDimensions (): WindowDimentions {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }
  

  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>(
    getWindowDimensions()
  )

  useEffect(() => {
    if (hasWindow) {
      function handleResize (): void {
        setWindowDimensions(getWindowDimensions())
      }
      window.addEventListener('resize', handleResize)
      return (): void => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow])
  return windowDimensions
}
