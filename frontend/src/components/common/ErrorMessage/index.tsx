import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './ErrorMessage.module.scss';
import Button from '../Button';

export interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
  onRetry,
}) => {
  return (
    <div className={`${styles.error} ${className}`}>
      <AlertCircle size={20} />
      <span className={styles.message}>{message}</span>
      {onRetry && (
        <Button
          variant="primary"
          size="small"
          onClick={onRetry}
          className={styles.retryButton}
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
