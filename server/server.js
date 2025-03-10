import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import { apiLimiter, authLimiter } from './config/rateLimit.js';
import { verifyJWT } from './middleware/authMiddleware.js';
import { errorHandler } from './utils/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import { createExpenseRoutes } from './routes/expenseRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import recurringRoutes from './routes/recurringRoutes.js';

const app = express();
const httpServer = createServer(app);

// Database connection
connectDB();

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Apply rate limiters to specific routes
app.use('/api/auth', authLimiter, authRoutes);

// Protected routes with general rate limiting
const expenseRoutes = createExpenseRoutes(io); // Create expense routes instance
app.use('/api/expenses', verifyJWT, apiLimiter, expenseRoutes);
app.use('/api/analytics', verifyJWT, apiLimiter, analyticsRoutes);
app.use('/api/goals', verifyJWT, apiLimiter, goalRoutes);
app.use('/api/ai', verifyJWT, apiLimiter, aiRoutes);
app.use('/api/recurring', verifyJWT, apiLimiter, recurringRoutes);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));