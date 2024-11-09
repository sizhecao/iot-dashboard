import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Navigation', () => {
  it('renders dashboard by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { 
      name: 'Dashboard',
      level: 1
    })).toBeInTheDocument();
    
    expect(screen.getByText('Overview of your IoT devices and systems')).toBeInTheDocument();
  });

  it('navigates between pages', async () => {
    render(<App />);
    
    // Navigate to Devices
    const devicesLink = screen.getByText('Devices');
    fireEvent.click(devicesLink);
    expect(screen.getByText('Manage and monitor your connected devices')).toBeInTheDocument();

    // Navigate to Alerts
    const alertsLink = screen.getByText('Alerts');
    fireEvent.click(alertsLink);
    expect(screen.getByText('View and manage system alerts')).toBeInTheDocument();

    // Navigate to Settings
    const settingsLink = screen.getByText('Settings');
    fireEvent.click(settingsLink);
    expect(screen.getByText('Configure system settings')).toBeInTheDocument();
  });

  it('shows 404 page for invalid routes', () => {
    window.history.pushState({}, '', '/invalid-route');
    render(<App />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});