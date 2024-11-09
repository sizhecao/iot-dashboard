// WebSocket event handlers
import { Socket } from 'socket.io';
import { logger } from '../utils/logger';
import { WebSocketService } from '.';

export const setupEventHandlers = (socket: Socket): void => {
  // Handle client subscribing to device updates
  socket.on('subscribeToDevice', (deviceId: string) => {
    socket.join(`device:${deviceId}`);
    logger.info(`Client ${socket.id} subscribed to device: ${deviceId}`);
  });

  // Handle client unsubscribing from device updates
  socket.on('unsubscribeFromDevice', (deviceId: string) => {
    socket.leave(`device:${deviceId}`);
    logger.info(`Client ${socket.id} unsubscribed from device: ${deviceId}`);
  });

  // Device data requests
  socket.on('requestDeviceData', (deviceId: string) => {
    logger.info(`Client ${socket.id} requested data for device: ${deviceId}`);
    // Handle device data request
  });

  // Connection status
  socket.on('connect_error', (error) => {
    logger.error(`Connection error for client ${socket.id}:`, error);
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    logger.info(
      `Reconnection attempt ${attemptNumber} for client ${socket.id}`
    );
  });

  socket.on('reconnect', () => {
    logger.info(`Client ${socket.id} reconnected successfully`);
  });

  // Client heartbeat
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: Date.now() });
  });

  // Custom events for device interaction
  socket.on('updateDeviceConfig', (data: { deviceId: string; config: any }) => {
    logger.info(
      `Client ${socket.id} updating config for device: ${data.deviceId}`
    );
    // Handle device config update WIP
  });
};
