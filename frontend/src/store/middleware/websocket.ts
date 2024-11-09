import { Action, Middleware } from '@reduxjs/toolkit';
import { WebSocketManager } from '../../services/websocket/WebSocketManager';
import { deviceAdded, deviceDataReceived } from '../slices/deviceSlice';
import { wsStatusChanged, wsErrorOccurred } from '../slices/websocketSlice';

interface WebSocketAction extends Action {
  type: 'devices/subscribeToDevice' | 'devices/unsubscribeFromDevice';
  payload: string;
}

const isWebSocketAction = (action: unknown): action is WebSocketAction => {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (
      action.type === 'devices/subscribeToDevice' ||
      action.type === 'devices/unsubscribeFromDevice'
    )
  );
};

export const createWebSocketMiddleware = (wsManager: WebSocketManager): Middleware => {
  return (store) => {
    // Set up WebSocket event handlers
    wsManager.setEventHandlers({
      onDeviceData: (data) => {
        store.dispatch(deviceDataReceived(data));
      },
      onDeviceAdded: (device) => {
        store.dispatch(deviceAdded(device));
        // Automatically subscribe to the new device's updates
        wsManager.subscribeToDevice(device.id);
      },
      onStatusChange: (status) => {
        store.dispatch(wsStatusChanged(status));
      },
      onError: (error) => {
        store.dispatch(wsErrorOccurred(error instanceof Error ? error.message : error.message));
      }
    });

    return next => action => {
      if (isWebSocketAction(action)) {
        console.log('Action:', action.type);
        switch (action.type) {
          case 'devices/subscribeToDevice':
            wsManager.subscribeToDevice(action.payload);
            break;
          case 'devices/unsubscribeFromDevice':
            wsManager.unsubscribeFromDevice(action.payload);
            break;
        }
      }

      return next(action);
    };
  };
};