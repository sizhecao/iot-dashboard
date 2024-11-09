export type DeviceType = 'temperature' | 'humidity' | 'motion' | 'gps';

export interface DeviceConfig {
  updateInterval: number;
  // Add other configuration options based on device type
  minValue?: number;
  maxValue?: number;
  unit?: string;
}

// Static device information
export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  config: DeviceConfig;
  status: 'active' | 'inactive';
}

// Real-time device data
export interface DeviceData {
  deviceId: string;
  timestamp: number;
  value: number;
  type: DeviceType;
}

export interface DeviceWithData extends Device {
  currentValue?: number;
  lastUpdated?: number;
}

export interface WSEventMap {
  error: { message: string; timestamp: number };
  connectionError: { message: string; timestamp: number };
  connectionTimeout: { message: string; timestamp: number };
  reconnectionFailed: { message: string; timestamp: number };
}

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}
