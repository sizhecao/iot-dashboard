import { Device, DeviceConfig, APIResponse } from "../types";
import config from "../config/env";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new ApiError(response.status, error.message);
  }
  const data = await response.json();
  console.log('API Response:', data);  // Debug log
  return data;
}

export const api = {
  // Device endpoints
  devices: {
    async getAll(): Promise<Device[]> {
      const response = await fetch(`${config.API_URL}/api/devices`);
      return handleResponse(response);
    },
    
    async getById(id: string): Promise<APIResponse<Device>> {
      const response = await fetch(`${config.API_URL}/api/devices/${id}`);
      return handleResponse(response);
    },

    async create(
      type: string,
      name: string,
      deviceConfig: DeviceConfig
    ): Promise<APIResponse<Device>> {
      const response = await fetch(`${config.API_URL}/api/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, deviceConfig }),
      });
      return handleResponse(response);
    },

    async delete(id: string): Promise<void> {
      const response = await fetch(`${config.API_URL}/api/devices/${id}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },
  },
};

// Error handling middleware
export function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    console.error(`API Error (${error.status}):`, error.message);
    throw error;
  }
  console.error("Unexpected error:", error);
  throw new Error("An unexpected error occurred");
}
