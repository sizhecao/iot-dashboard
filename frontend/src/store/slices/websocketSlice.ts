import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketStatus } from '../../services/websocket/WebSocketManager';

interface WebSocketState {
  status: WebSocketStatus;
  error: string | null;
}

const initialState: WebSocketState = {
  status: 'disconnected',
  error: null,
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsStatusChanged(state, action: PayloadAction<WebSocketStatus>) {
      state.status = action.payload;
    },
    wsErrorOccurred(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    wsClearError(state) {
      state.error = null;
    },
  },
});

export const { wsStatusChanged, wsErrorOccurred, wsClearError } =
  websocketSlice.actions;
export default websocketSlice.reducer;
