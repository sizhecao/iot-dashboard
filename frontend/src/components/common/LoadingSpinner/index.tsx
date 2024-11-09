import React from 'react';
import styles from './LoadingSpinner.module.scss';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = ''
}) => {
  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '32px'
  };

  return (
    <div className={`${styles.spinner} ${className}`}>
      <svg
        width={sizeMap[size]}
        height={sizeMap[size]}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
          fill="none"
        />
        <circle
          className={styles.progress}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;