import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { setupEventHandlers } from './event';
import { setupErrorHandling } from './error-handling';
import { logger } from '../utils/logger';

export class WebSocketService {
  private io: SocketServer;
  private readonly pingInterval = 1000; // 1 second
  private readonly pingTimeout = 30000; // 3 seconds
  private readonly connectionTimeout = 5000; // 5 seconds
  private connectedClients: Map<string, Socket>;

  constructor(httpServer: HttpServer) {
    this.io = new SocketServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://127.0.0.1:3000',
        methods: ['GET', 'POST'],
      },
      pingInterval: this.pingInterval,
      pingTimeout: this.pingTimeout,
      connectTimeout: this.connectionTimeout,
    });

    this.connectedClients = new Map();
    this.initialize();
  }

  private initialize(): void {
    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });
  }

  private handleConnection(socket: Socket): void {
    // Add client to connected clients map
    this.connectedClients.set(socket.id, socket);
    logger.info(`Client connected: ${socket.id}`);

    // Monitor connection health
    socket.conn.on('ping', () => {
      logger.debug(`Ping sent to client: ${socket.id}`);
    });

    socket.conn.on('pong', () => {
      logger.debug(`Pong received from client: ${socket.id}`);
    });

    // Set up event handlers
    setupEventHandlers(socket); // Pass 'this' if needed for broadcasting
    setupErrorHandling(socket);

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      this.handleDisconnect(socket, reason);
    });
  }

  private handleDisconnect(socket: Socket, reason: string): void {
    this.connectedClients.delete(socket.id);
    logger.info(`Client disconnected: ${socket.id}, Reason: ${reason}`);
  }

  // Method to broadcast to all clients
  public broadcast(event: string, data: any): void {
    this.io.emit(event, data);
  }

  public getConnectedClients(): number {
    return this.connectedClients.size;
  }
}
