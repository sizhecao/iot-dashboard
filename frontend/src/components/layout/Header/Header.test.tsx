import { render, fireEvent, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  test('renders header with default title', () => {
    render(<Header />);
    expect(screen.getByText('IoT Dashboard')).toBeInTheDocument();
  });

  test('renders custom title', () => {
    render(<Header title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  test('calls onMenuClick when menu button is clicked', () => {
    const mockOnMenuClick = vi.fn();
    render(<Header onMenuClick={mockOnMenuClick} />);

    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(mockOnMenuClick).toHaveBeenCalled();
  });
});
