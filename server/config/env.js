import dotenv from 'dotenv'

export const loadEnv = () => {
  const result = dotenv.config()
  if (result.error) {
    console.error('❌ Environment config error:', result.error)
    process.exit(1)
  }
  console.log('✅ Environment variables loaded')
}