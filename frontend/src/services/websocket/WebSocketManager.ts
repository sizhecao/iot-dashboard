import { io, Socket } from 'socket.io-client';
import config from '../../config/env';
import { Device, DeviceData, WSEventMap } from '../../types';

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WSEventHandlers {
  onDeviceData?: (data: DeviceData) => void;
  onDeviceAdded?: (device: Device) => void; 
  onStatusChange?: (status: WebSocketStatus) => void;
  onError?: (error: WSEventMap['error'] | Error) => void;
}

export class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: Socket | null = null;
  private handlers: WSEventHandlers = {};
  private status: WebSocketStatus = 'disconnected';
  private readonly MAX_RECONNECTION_ATTEMPTS = 5;
  private readonly RECONNECTION_DELAY = 1000;

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public initialize() {
    if (this.socket) return;

    this.updateStatus('connecting');

    this.socket = io(config.WS_URL, {
      reconnectionAttempts: this.MAX_RECONNECTION_ATTEMPTS,
      reconnectionDelay: this.RECONNECTION_DELAY,
      autoConnect: true,
      transports: ['websocket'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.updateStatus('connected');
    });

    this.socket.on('disconnect', () => {
      this.updateStatus('disconnected');
    });

    this.socket.on('connect_error', (error) => {
      this.updateStatus('error');
      this.handlers.onError?.(error);
    });

    this.socket.on('deviceData', (data: DeviceData) => {
      this.handlers.onDeviceData?.(data);
    });

    this.socket.on('deviceAdded', (device: Device) => {
      console.log('New device added:', device);
      this.handlers.onDeviceAdded?.(device);
    });
  }

  private updateStatus(status: WebSocketStatus) {
    this.status = status;
    this.handlers.onStatusChange?.(status);
  }

  public setEventHandlers(handlers: WSEventHandlers) {
    this.handlers = handlers;
  }

  public getStatus(): WebSocketStatus {
    return this.status;
  }

  public subscribeToDevice(deviceId: string) {
    this.socket?.emit('subscribeToDevice', deviceId);
  }

  public unsubscribeFromDevice(deviceId: string) {
    this.socket?.emit('unsubscribeFromDevice', deviceId);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.updateStatus('disconnected');
  }
}

export const wsManager = WebSocketManager.getInstance();
