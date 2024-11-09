import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentArea } from '../../components/layout';
import styles from './NotFound.module.scss';
import Button from '../../components/common/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ContentArea className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>Page not found</p>
        <Button 
          onClick={() => navigate('/')}
          variant="primary"
          size="medium"
        >
          Return to Dashboard
        </Button>
      </div>
    </ContentArea>
  );
};

export default NotFoundPage;
