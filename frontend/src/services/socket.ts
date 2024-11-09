// import { io, Socket } from 'socket.io-client';
// import { config } from '../config/env';
// import { DeviceConfig, DeviceData, WSEventMap } from '../types';

// type WebSocketEventHandlers = {
//   onDeviceData?: (data: DeviceData) => void;
//   onError?: (error: WSEventMap['error'] | Error) => void;
//   onReconnect?: () => void;
//   onDisconnect?: () => void;
// };

// class WebSocketService {
//   private socket: Socket | null = null;
//   private subscriptions: Set<string> = new Set();
//   private eventHandlers: WebSocketEventHandlers = {};
//   private readonly MAX_RECONNECT_ATTEMPTS = 5;
//   private readonly PING_INTERVAL = 30000; // 30 seconds

//   constructor() {
//     this.initialize();
//   }

//   private initialize() {
//     this.socket = io(config.WS_URL, {
//       reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
//       reconnectionDelay: 1000,
//       autoConnect: true,
//       transports: ['websocket']
//     });

//     this.setupEventListeners();
//     this.setupPingInterval();
//   }

//   private setupEventListeners() {
//     if (!this.socket) return;

//     // Connection events
//     this.socket.on('connect', this.handleConnect.bind(this));
//     this.socket.on('disconnect', this.handleDisconnect.bind(this));
//     this.socket.on('connect_error', this.handleError.bind(this));
//     this.socket.on('reconnect', this.handleReconnect.bind(this));
//     this.socket.on('reconnect_failed', this.handleReconnectFailed.bind(this));

//     // Server events
//     this.socket.on('deviceData', (data: DeviceData) => {
//       this.eventHandlers.onDeviceData?.(data);
//     });

//     // Error events from server
//     this.socket.on('error', (error: WSEventMap['error']) => {
//       console.error('Server error:', error);
//       this.eventHandlers.onError?.(error);
//     });

//     this.socket.on('connectionError', (error: WSEventMap['connectionError']) => {
//       console.error('Connection error:', error);
//       this.eventHandlers.onError?.(error);
//     });
//   }

//   private setupPingInterval() {
//     setInterval(() => {
//       if (this.socket?.connected) {
//         this.socket.emit('ping');
//       }
//     }, this.PING_INTERVAL);
//   }

//   private handleConnect() {
//     console.log('WebSocket connected');
//     this.resubscribeToDevices();
//   }

//   private handleDisconnect(reason: string) {
//     console.log('WebSocket disconnected:', reason);
//     this.eventHandlers.onDisconnect?.();
//   }

//   private handleError(error: Error) {
//     console.error('WebSocket error:', error);
//     this.eventHandlers.onError?.(error);
//   }

//   private handleReconnect(attemptNumber: number) {
//     console.log('Reconnected after', attemptNumber, 'attempts');
//     this.eventHandlers.onReconnect?.();
//     this.resubscribeToDevices();
//   }

//   private handleReconnectFailed() {
//     console.error('Failed to reconnect after', this.MAX_RECONNECT_ATTEMPTS, 'attempts');
//   }

//   private resubscribeToDevices() {
//     this.subscriptions.forEach(deviceId => {
//       this.socket?.emit('subscribeToDevice', deviceId);
//     });
//   }

//   public subscribeToDevice(deviceId: string) {
//     if (!this.socket?.connected) {
//       console.warn('WebSocket not connected. Will subscribe when connection is established.');
//       this.subscriptions.add(deviceId);
//       return;
//     }

//     this.socket.emit('subscribeToDevice', deviceId);
//     this.subscriptions.add(deviceId);
//   }

//   public unsubscribeFromDevice(deviceId: string) {
//     if (this.socket?.connected) {
//       this.socket.emit('unsubscribeFromDevice', deviceId);
//     }
//     this.subscriptions.delete(deviceId);
//   }

//   public setEventHandlers(handlers: WebSocketEventHandlers) {
//     this.eventHandlers = handlers;
//   }

//   public updateDeviceConfig(deviceId: string, config: DeviceConfig) {
//     if (!this.socket?.connected) {
//       throw new Error('WebSocket not connected');
//     }
//     this.socket.emit('updateDeviceConfig', { deviceId, config });
//   }

//   public requestDeviceData(deviceId: string) {
//     if (!this.socket?.connected) {
//       throw new Error('WebSocket not connected');
//     }
//     this.socket.emit('requestDeviceData', deviceId);
//   }

//   public disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }

//   public isConnected(): boolean {
//     return this.socket?.connected ?? false;
//   }

//   public getSocket(): Socket | null {
//     return this.socket;
//   }
// }

// // Export a singleton instance
// export const wsService = new WebSocketService();