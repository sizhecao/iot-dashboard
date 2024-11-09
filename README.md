# IoT Dashboard

A real-time IoT device monitoring dashboard built with modern web technologies. This project demonstrates full-stack development capabilities through a sophisticated IoT device simulation and monitoring system.

## Features

- Real-time device monitoring with WebSocket communication
- Interactive data visualization with customizable dashboard layouts
- Device simulation system for testing and demonstration
- Live data streaming with configurable update frequencies
- Alert system with customizable thresholds and notifications
- Historical data tracking and analysis
- Responsive design for various screen sizes

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Socket.io client for real-time communication
- SCSS modules for styling

### Backend
- Node.js with Express
- TypeScript
- Socket.io for WebSocket communication
- Device simulation system

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

## Getting Started

1. Clone the repository
```bash
git clone 
cd iot-dashboard
```

2. Create necessary environment files:

Frontend (.env in frontend directory):
```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

Backend (.env in backend directory):
```env
NODE_ENV=development
PORT=3001
```

3. Start the development environment:
```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001


## Development

### Running the Application

Start all services:
```bash
docker-compose up
```

Stop all services:
```bash
docker-compose down
```