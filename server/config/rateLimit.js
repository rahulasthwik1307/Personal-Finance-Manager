import rateLimit from 'express-rate-limit'

const developmentSettings = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Increased for development
  standardHeaders: true,
  legacyHeaders: false
}

export const apiLimiter = rateLimit({
  ...developmentSettings,
  message: { message: 'Too many API requests' }
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 100 : 20,
  message: { message: 'Too many authentication requests' },
  standardHeaders: true
})
