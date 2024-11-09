import { Socket } from 'socket.io';
import { logger } from '../utils/logger';

export const setupErrorHandling = (socket: Socket): void => {
  // Handle socket errors
  socket.on('error', (error) => {
    logger.error(`Socket error for client ${socket.id}:`, error);
    socket.emit('error', {
      message: 'Internal server error',
      timestamp: Date.now(),
    });
  });

  // Handle connection errors
  socket.on('connect_error', (error) => {
    logger.error(`Connection error for client ${socket.id}:`, error);
    socket.emit('connectionError', {
      message: 'Failed to connect to server',
      timestamp: Date.now()
    });
  });

  // Handle timeout
  socket.on('connect_timeout', () => {
    logger.error(`Connection timeout for client ${socket.id}`);
    socket.emit('connectionTimeout', {
      message: 'Connection timed out',
      timestamp: Date.now()
    });
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    logger.info(`Client ${socket.id} disconnected. Reason: ${reason}`);
  });

  // Handle reconnection errors
  socket.on('reconnect_error', (error) => {
    logger.error(`Reconnection error for client ${socket.id}:`, error);
  });

  // Handle failed reconnection attempts
  socket.on('reconnect_failed', () => {
    logger.error(`Reconnection failed for client ${socket.id}`);
    socket.emit('reconnectionFailed', {
      message: 'Failed to reconnect to server',
      timestamp: Date.now()
    });
  });

  // Process uncaught errors
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    socket.emit('error', { 
      message: 'Internal server error',
      timestamp: Date.now()
    });
  });
};
