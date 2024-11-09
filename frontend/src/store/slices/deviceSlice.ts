import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceData, DeviceConfig } from '../../types';
import { api, handleApiError } from '../../services/api';
import { wsManager } from '../../services/websocket/WebSocketManager';

interface DeviceState {
  devices: Record<string, Device>;
  deviceData: Record<string, DeviceData>;
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: {},
  deviceData: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async () => {
    try {
      const response = await api.devices.getAll();
      return response;
    } catch (error) {
      handleApiError(error);
    }
  }
);

export const createDevice = createAsyncThunk(
  'devices/createDevice',
  async ({
    type,
    name,
    config,
  }: {
    type: string;
    name: string;
    config: DeviceConfig;
  }) => {
    try {
      const response = await api.devices.create(type, name, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
);

export const subscribeToDeviceData = createAsyncThunk(
  'devices/subscribeToDevice',
  async (deviceId: string) => {
    try {
      wsManager.subscribeToDevice(deviceId);
      return deviceId;
    } catch (error) {
      console.error('Failed to subscribe to device:', error);
      throw error;
    }
  }
);

export const unsubscribeFromDeviceData = createAsyncThunk(
  'devices/unsubscribeFromDevice',
  async (deviceId: string) => {
    try {
      wsManager.unsubscribeFromDevice(deviceId);
      return deviceId;
    } catch (error) {
      console.error('Failed to unsubscribe from device:', error);
      throw error;
    }
  }
);

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    deviceDataReceived(state, action: PayloadAction<DeviceData>) {
      const { deviceId } = action.payload;
      state.deviceData[deviceId] = action.payload;
    },
    deviceStatusChanged(
      state,
      action: PayloadAction<{ deviceId: string; status: Device['status'] }>
    ) {
      const { deviceId, status } = action.payload;
      if (state.devices[deviceId]) {
        state.devices[deviceId].status = status;
      }
    },
    deviceAdded(state, action: PayloadAction<Device>) {
      const device = action.payload;
      state.devices[device.id] = device;
    },
    deviceRemoved(state, action: PayloadAction<string>) {
      const deviceId = action.payload;
      if (state.devices[deviceId]) {
        delete state.devices[deviceId];
        delete state.deviceData[deviceId];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        console.log('fetchDevices fulfilled with payload:', action.payload);
        state.loading = false;
        if (action.payload) {
          action.payload.forEach((device) => {
            state.devices[device.id] = device;
          });
        }
        console.log('Updated devices state:', state.devices);
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch devices';
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        if (action.payload) {
          state.devices[action.payload.id] = action.payload;
        }
      });
  },
});

export const {
  deviceDataReceived,
  deviceStatusChanged,
  deviceAdded,
  deviceRemoved,
} = deviceSlice.actions;
export default deviceSlice.reducer;
