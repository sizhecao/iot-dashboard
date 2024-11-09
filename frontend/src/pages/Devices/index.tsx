import React, { useEffect, useMemo, useState } from 'react';
import { PageProps } from '../types';
import { ContentArea } from '../../components/layout';
import { DeviceList } from '../../components/devices';
import styles from './Devices.module.scss';
import Button from '../../components/common/Button';
import { LayoutGrid, List } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchDevices,
  subscribeToDeviceData,
  unsubscribeFromDeviceData,
} from '../../store/slices/deviceSlice';
import { ErrorMessage, LoadingSpinner } from '../../components/common';
import { DeviceWithData } from '../../types';

const DevicesPage: React.FC<PageProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { devices, deviceData, loading, error } = useSelector(
    (state: RootState) => {
      console.log('Current state:', state.devices);
      return state.devices;
    }
  );

  const { status: wsStatus, error: wsError } = useSelector(
    (state: RootState) => state.websocket
  );

  useEffect(() => {
    console.log('Dispatching fetchDevices');
    dispatch(fetchDevices())
      .unwrap()
      .then((fetchedDevices) => {
        // Subscribe to each device after fetching
        fetchedDevices?.forEach((device) => {
          dispatch(subscribeToDeviceData(device.id));
        });
      })
      .catch((error) => {
        console.error('Failed to fetch devices:', error);
      });
    return () => {
      Object.keys(devices).forEach((deviceId) => {
        dispatch(unsubscribeFromDeviceData(deviceId));
      });
    };
  }, [dispatch]);

  // Log for debugging
  useEffect(() => {
    console.log('Current devices:', devices);
    console.log('Current deviceData:', deviceData);
    console.log('WebSocket status:', wsStatus);
  }, [devices, deviceData, wsStatus]);

  const devicesList: DeviceWithData[] = useMemo(() => {
    return Object.values(devices).map(device => ({
      ...device,
      currentValue: deviceData[device.id]?.value,
      lastUpdated: deviceData[device.id]?.timestamp
    }));
  }, [devices, deviceData]);

  if (loading) {
    return (
      <ContentArea>
        <LoadingSpinner size="large" />
      </ContentArea>
    );
  }

  if (error || wsError) {
    console.log(error);
    console.log(wsError);
    return (
      <ContentArea>
        <ErrorMessage message={error || wsError || 'An error occurred'} />
      </ContentArea>
    );
  }

  const isOffline = wsStatus === 'disconnected' || wsStatus === 'error';

  return (
    <ContentArea
      title="Devices"
      description="Manage and monitor your connected devices"
      className={className}
    >
      {isOffline && (
        <div className={styles.offlineWarning}>
          Connection lost. Real-time updates are not available.
        </div>
      )}
      <div className={styles.controls}>
        <div className={styles.viewToggle}>
          <Button
            variant="ghost"
            size="small"
            className={view === 'grid' ? styles.active : ''}
            onClick={() => setView('grid')}
          >
            <LayoutGrid size={20} />
          </Button>
          <Button
            variant="ghost"
            size="small"
            className={view === 'list' ? styles.active : ''}
            onClick={() => setView('list')}
          >
            <List size={20} />
          </Button>
        </div>
        {/* Add other controls like search, filter, etc. */}
      </div>
      <DeviceList devices={devicesList} view={view} />
    </ContentArea>
  );
};

export default DevicesPage;
