import React from 'react';
import { Droplets, Radio, Thermometer } from 'lucide-react';
import { Card } from '../../../components/common';
import styles from './DeviceCard.module.scss';
import type { DeviceType, DeviceWithData } from '../../../types';

export interface DeviceCardProps {
  device: DeviceWithData;
  className?: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, className = '' }) => {
  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className={styles.icon} />;
      case 'humidity':
        return <Droplets className={styles.icon} />;
      case 'motion':
        return <Radio className={styles.icon} />;
      default:
        return null;
    }
  };

  const getCurrentValue = (device: DeviceWithData) => {
    if (device.currentValue === undefined) return 'No data';
    switch (device.type) {
      case 'temperature':
        return `Current Value: ${device.currentValue}°C`;
      case 'humidity':
        return `Current Value: ${device.currentValue}%`;
      case 'motion':
        return device.currentValue ? 'Motion Detected' : 'No Motion';
      default:
        return device.currentValue.toString();
    }
  };

  // const formatTimestamp = (timestamp?: number) => {
  //   if (!timestamp) return 'Never';
  //   return new Date(timestamp).toLocaleTimeString();
  // };

  return (
    <Card className={`${styles.deviceCard} ${className}`}>
      <div className={styles.content}>
        <div className={`${styles.status} ${styles[device.status]}`} />
        <div className={`${styles.iconWrapper} ${styles[device.type]}`}>
          {getDeviceIcon(device.type)}
        </div>
        <div className={styles.deviceInfo}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.name}>{device.name}</h3>
              <div className={styles.idText}>ID: {device.id}</div>
            </div>
          </div>
        </div>
        <div className={styles.value}>
          <span className={styles.number}>{getCurrentValue(device)}</span>
        </div>
        {/* <div className={styles.lastUpdated}>
          Last updated: {formatTimestamp(device.lastUpdated)}
        </div> */}
      </div>
    </Card>
  );
};

export default DeviceCard;
