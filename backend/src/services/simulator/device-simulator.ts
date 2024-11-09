import { Device, DeviceData, DeviceType } from '../../types/device';
import { logger } from '../../utils/logger';
import { wsService } from '../../index';
import { DeviceOperationError } from '../../utils/errors';

export class DeviceSimulator {
  private devices: Map<string, Device>;
  private intervals: Map<string, NodeJS.Timeout>;

  constructor() {
    this.devices = new Map();
    this.intervals = new Map();
  }

  public addDevice(device: Device): void {
    this.devices.set(device.id, device);
    this.startSimulation(device.id);
    logger.info(`DeviceSimulator: Added simulated device: ${device.id}`);
  }

  public removeDevice(deviceId: string): void {
    this.stopSimulation(deviceId);
    this.devices.delete(deviceId);
    logger.info(`DeviceSimulator: Removed simulated device: ${deviceId}`);
  }

  private startSimulation(deviceId: string): void {
    const device = this.devices.get(deviceId);
    if (!device) return;

    const interval = setInterval(() => {
      const data = this.generateData(device);
      this.emitData(data);
    }, device.config.updateInterval);

    this.intervals.set(deviceId, interval);
  }

  private stopSimulation(deviceId: string): void {
    const interval = this.intervals.get(deviceId);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(deviceId);
    }
  }

  private generateData(device: Device): DeviceData {
    let value: number | boolean;

    try {
      switch (device.type) {
        case 'temperature':
          value = this.generateTemperature(device);
          break;
        case 'humidity':
          value = this.generateHumidity(device);
          break;
        case 'motion':
          value = this.generateMotion();
          break;
        default:
          // This should never happens due to type checking
          throw new DeviceOperationError(`Unknown device type: ${device.type}`);
      }

      return {
        deviceId: device.id,
        timestamp: Date.now(),
        value,
        unit: device.config.unit,
      };
    } catch (error) {
      throw new DeviceOperationError(
        `Failed to generate data for device ${device.id}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  private generateTemperature(device: Device): number {
    const min = device.config.minValue ?? 15;
    const max = device.config.maxValue ?? 35;
    return +(min + Math.random() * (max - min)).toFixed(1);
  }

  private generateHumidity(device: Device): number {
    const min = device.config.minValue ?? 30;
    const max = device.config.maxValue ?? 70;
    return +(min + Math.random() * (max - min)).toFixed(1);
  }

  private generateMotion(): boolean {
    return Math.random() > 0.7;
  }

  private emitData(data: DeviceData): void {
    wsService.broadcast('deviceData', data);
    logger.debug(`Emitted data for device: ${data.deviceId}`, data);
  }
}
