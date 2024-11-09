import React from 'react';
import { HeaderProps } from './types';
import { Menu, Bell } from 'lucide-react';

import styles from './Header.module.scss';
import Button from '../../common/Button';

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  className = '',
  title = 'IoT Dashboard',
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.leftSection}>
        <Button
          variant="ghost"
          size="small"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </Button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.rightSection}>
        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="small"
          className={styles.iconButton}
          aria-label="View notifications"
        >
          <Bell size={24} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
