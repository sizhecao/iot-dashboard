import React from 'react';
import { PageProps } from '../types';
import { ContentArea } from '../../components/layout';

const AlertsPage: React.FC<PageProps> = ({ className }) => {
  return (
    <ContentArea
      title="Alerts"
      description="View and manage system alerts"
      className={className}
    >
      <div>Alerts Content</div>
    </ContentArea>
  );
};

export default AlertsPage;
