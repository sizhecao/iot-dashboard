import React from 'react';
import { PageProps } from '../types';
import { ContentArea } from '../../components/layout';

const SettingsPage: React.FC<PageProps> = ({ className }) => {
  return (
    <ContentArea
      title="Settings"
      description="Configure system settings"
      className={className}
    >
      <div>Settings Content</div>
    </ContentArea>
  );
};

export default SettingsPage;
