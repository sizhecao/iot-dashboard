import { Router } from 'express';
import { DeviceManager } from '../services/device-manager';
import { logger } from '../utils/logger';

const router = Router();
const deviceManager = new DeviceManager();

// Create a device
router.post('/', async (req, res, next) => {
  try {
    const { type, name, config } = req.body;
    const device = deviceManager.createDevice(type, name, config);
    res.status(201).json(device);
  } catch (error) {
    next(error);
  }
});

// Remove a device
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    deviceManager.removeDevice(id);
    res.status(204).send();
  } catch (error) {
    next(error); // Pass to error handling middleware
  }
});

router.get('/', async (req, res, next) => {
  try {
    const devices = deviceManager.getAllDevices();
    res.status(201).json(devices);
  } catch (error) {
    next(error);
  }
});

export { router as deviceRoutes };
