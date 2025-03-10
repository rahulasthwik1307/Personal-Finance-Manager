import { useEffect, useState } from 'react'
import { debounce } from '../utils/cacheManager'

export const AuthValidation = ({ onCheck }) => {
  const [isChecking, setIsChecking] = useState(false)
  
  const debouncedCheck = debounce(async (type, value) => {
    setIsChecking(true)
    try {
      await onCheck(type, value)
    } finally {
      setIsChecking(false)
    }
  }, 500) // 0.5s debounce

  return (
    <div className="validation-status">
      {isChecking && <span>Checking availability...</span>}
    </div>
  )
}