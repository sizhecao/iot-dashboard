import React from 'react';
import styles from './DeviceList.module.scss';
import type { DeviceWithData } from '../../../types/index';
import { DeviceCard } from '..';

export interface DeviceListProps {
  devices: DeviceWithData[];
  className?: string;
  view: 'grid' | 'list';
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  className = '',
  view,
}) => {
  return (
    <div className={`${styles.deviceList} ${styles[view]} ${className}`}>
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
};

export default DeviceList;
