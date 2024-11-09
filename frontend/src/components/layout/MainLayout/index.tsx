import React, { useCallback, useEffect, useState } from 'react';
import { MainLayoutProps } from './types';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';

const MainLayout: React.FC<MainLayoutProps> = ({
  sidebarOpen: externalSidebarOpen,
  setSidebarOpen: externalSetSidebarOpen,
  className = '',
}) => {
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
  const sidebarOpen = externalSidebarOpen ?? internalSidebarOpen;
  const setSidebarOpen = externalSetSidebarOpen ?? setInternalSidebarOpen;
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location, setSidebarOpen]);

  return (
    <div className={`${styles.mainLayout} ${className}`}>
      <div className={styles.headerArea}>
        <Header onMenuClick={toggleSidebar} />
      </div>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.sidebarArea} ${
            !sidebarOpen ? styles.collapsed : ''
          }`}
        >
          <Sidebar collapsed={false} />
        </div>
        <main className={styles.mainArea}>
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout;
