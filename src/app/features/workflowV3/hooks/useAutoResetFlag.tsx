import { useEffect, useState } from 'react'

const useAutoResetFlag = (initialState: boolean, timeout: number) => {
  const [flag, setFlag] = useState<boolean>(initialState)

  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => setFlag(false), timeout)
      return () => clearTimeout(timer) // Cleanup on unmount or re-trigger
    }
  }, [flag, timeout])

  return [flag, setFlag] as const
}

export default useAutoResetFlag
