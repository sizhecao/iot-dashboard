import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './index';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MainLayout', () => {
  beforeEach(() => {
    // Reset window width to desktop
    window.innerWidth = 1024;
  });

  it('shows sidebar by default on desktop', () => {
    renderWithRouter(<MainLayout />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeVisible();
  });
});
