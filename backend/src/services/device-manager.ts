import { v4 as uuidv4 } from 'uuid';
import { Device, DeviceType, DeviceConfig, isValidDeviceType, VALID_DEVICE_TYPES } from '../types/device';
import { DeviceSimulator } from './simulator/device-simulator';
import { logger } from '../utils/logger';
import { DeviceNotFoundError, InvalidDeviceConfigError, InvalidDeviceTypeError } from '../utils/errors';
import { wsService } from '..';

export class DeviceManager {
  private simulator: DeviceSimulator;
  private devices: Map<string, Device>;

  constructor() {
    this.simulator = new DeviceSimulator();
    this.devices = new Map();
  }

  public createDevice(
    type: string,
    name: string,
    config: Partial<DeviceConfig> = {}
  ): Device {
    if (!name) {
      throw new InvalidDeviceConfigError('Device name is required');
    }

    if (!isValidDeviceType(type)) {
      throw new InvalidDeviceTypeError(type);
    }

    this.validateDeviceConfig(type, config);

    const device: Device = {
      id: uuidv4(),
      type,
      name,
      status: 'active',
      config: {
        updateInterval: config.updateInterval || 5000,
        minValue: config.minValue,
        maxValue: config.maxValue,
        unit: this.getDefaultUnit(type)
      }
    };

    this.devices.set(device.id, device);
    this.simulator.addDevice(device);
    wsService.broadcast('deviceAdded', device);

    logger.info(`DeviceManager: Created device: ${device.id}`);
    return device;
  }

  private validateDeviceConfig(type: DeviceType, config: Partial<DeviceConfig>): void {
    if (config.updateInterval && config.updateInterval < 1000) {
      throw new InvalidDeviceConfigError('Update interval must be at least 1000ms');
    }

    if (type === 'temperature') {
      if (config.minValue !== undefined && (config.minValue < -50 || config.minValue > 100)) {
        throw new InvalidDeviceConfigError('Temperature must be between -50°C and 100°C');
      }
      if (config.maxValue !== undefined && (config.maxValue < -50 || config.maxValue > 100)) {
        throw new InvalidDeviceConfigError('Temperature must be between -50°C and 100°C');
      }
    }

    if (type === 'humidity') {
      if (config.minValue !== undefined && (config.minValue < 0 || config.minValue > 100)) {
        throw new InvalidDeviceConfigError('Temperature must be between 0% and 100%');
      }
      if (config.maxValue !== undefined && (config.maxValue < 0 || config.maxValue > 100)) {
        throw new InvalidDeviceConfigError('Temperature must be between 0% and 100%');
      }
    }

    if (config.minValue !== undefined && config.maxValue !== undefined && config.minValue >= config.maxValue) {
      throw new InvalidDeviceConfigError('Minimum must be less than maxinmum vvalue.');
    }
  }

  private getDefaultUnit(type: DeviceType): string {
    switch (type) {
      case 'temperature':
        return '°C';
      case 'humidity':
        return '%';
      case 'motion':
        return '';
      default:
        // This should never happens due to type checking
        throw new InvalidDeviceTypeError(type);
    }
  }

  public removeDevice(deviceId: string): void {
    if (!this.devices.has(deviceId)) {
      throw new DeviceNotFoundError(deviceId);
    }

    this.simulator.removeDevice(deviceId);
    this.devices.delete(deviceId);
    logger.info(`DeviceManager: Removed device: ${deviceId}`);
  }

  public getAllDevices(): Device[] {
    const devicesArray = Array.from(this.devices.values());
    return devicesArray;
  }
}