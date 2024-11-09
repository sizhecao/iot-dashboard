import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketService } from './websocket';
import { logger } from './utils/logger';
import { deviceRoutes } from './routes/devices';
import { errorHandler } from './middleware/error-handler';

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initializa WebSocket Service
const wsService = new WebSocketService(httpServer);

// Routes
app.use('/api/devices', deviceRoutes);

// Error handling middleware
app.use(errorHandler);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

httpServer.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export { wsService };
