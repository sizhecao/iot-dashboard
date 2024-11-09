import React from 'react';
import { PageProps } from '../types';
import { ContentArea } from '../../components/layout';

const DashboardPage: React.FC<PageProps> = ({ className }) => {
  return (
    <ContentArea
      title="Dashboard"
      description="Overview of your IoT devices and systems"
      className={className}
    >
      <div>Dashboard Content</div>
    </ContentArea>
  );
};

export default DashboardPage;
