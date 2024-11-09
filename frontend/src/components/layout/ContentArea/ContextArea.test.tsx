import { render, screen } from '@testing-library/react';
import ContentArea from './index';

describe('ContentArea', () => {
  it('renders children content', () => {
    render(
      <ContentArea>
        <div>Test Content</div>
      </ContentArea>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders title and description when provided', () => {
    render(
      <ContentArea 
        title="Test Title" 
        description="Test Description"
      >
        <div>Content</div>
      </ContentArea>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    render(
      <ContentArea error="Test Error">
        <div>Content</div>
      </ContentArea>
    );
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('shows loading spinner when loading prop is true', () => {
    render(
      <ContentArea loading>
        <div>Content</div>
      </ContentArea>
    );
    // Look for loading spinner in the document
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});