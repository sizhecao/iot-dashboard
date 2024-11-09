import { VALID_DEVICE_TYPES } from '../types/device';

// Error handling utilities
export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
export class DeviceNotFoundError extends CustomError {
  constructor(id: string) {
    super(404, `Device with id ${id} not found`);
  }
}

export class InvalidDeviceTypeError extends CustomError {
  constructor(type: string) {
    super(
      400,
      `Invalid device type: ${type}. Valid types are: ${VALID_DEVICE_TYPES.join(', ')}`
    );
  }
}

export class InvalidDeviceConfigError extends CustomError {
  constructor(message: string) {
    super(400, `Invalid device configuration: ${message}`);
  }
}

export class DeviceOperationError extends CustomError {
  constructor(message: string) {
    super(500, `Device operation failed: ${message}`);
  }
}
