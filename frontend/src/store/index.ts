import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './slices/deviceSlice';
import websocketReducer from './slices/websocketSlice';
import { createWebSocketMiddleware } from './middleware/websocket';
import { wsManager } from '../services/websocket/WebSocketManager';

wsManager.initialize();
const webSocketMiddleware = createWebSocketMiddleware(wsManager);

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
