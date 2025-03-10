import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function AuthForm({
  schema,
  onSubmit,
  defaultValues,
  children,
  cooldown = 2000 // Default 2-second cooldown
}) {
  const [lastSubmit, setLastSubmit] = useState(0)
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  })

  const handleSubmit = async (data) => {
    const now = Date.now()
    if (now - lastSubmit < cooldown) return
    
    try {
      setLastSubmit(now)
      await onSubmit(data)
    } finally {
      methods.reset()
    }
  }

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      {children({
        ...methods,
        isCoolingDown: Date.now() - lastSubmit < cooldown
      })}
    </form>
  )
}