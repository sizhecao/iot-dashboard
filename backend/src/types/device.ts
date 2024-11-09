// Device-related types
export const VALID_DEVICE_TYPES = ['temperature', 'humidity', 'motion'] as const;
export type DeviceType = typeof VALID_DEVICE_TYPES[number];

export const isValidDeviceType = (type: string): type is DeviceType => {
  return VALID_DEVICE_TYPES.includes(type as DeviceType);
}

export interface DeviceConfig {
  updateInterval: number;
  minValue?: number;
  maxValue?: number;
  unit?: string;
}

export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  config: DeviceConfig;
  status: 'active' | 'inactive';
}

export interface DeviceData {
  deviceId: string;
  timestamp: number;
  value: number | boolean;
  unit?: string;
}