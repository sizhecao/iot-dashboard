import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ContentAreaProps } from './types';
import styles from './ContentArea.module.scss';
import LoadingSpinner from '../../common/LoadingSpinner';

const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  className = '',
  title,
  description,
  loading = false,
  error,
}) => {
  return (
    <div className={`${styles.contentArea} ${className}`}>
      {(title || description) && (
        <header className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <p className={styles.description}>{description}</p>}
        </header>
      )}

      {error && (
        <div className={styles.error}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.content}>
        {children}

        {/* Loading Overlay */}
        {loading && (
          <div className={styles.loading}>
            <LoadingSpinner size="medium" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
