import React from 'react';
import { NavItem, SidebarProps } from './types';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { AlertCircle, Cpu, LayoutDashboard, Settings } from 'lucide-react';

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: 'Devices',
    path: '/devices',
    icon: <Cpu size={20} />,
  },
  {
    title: 'Alerts',
    path: '/alerts',
    icon: <AlertCircle size={20} />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings size={20} />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  className = '',
}) => {
  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.collapsed : ''
      } ${className}`}
    >
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.title}>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
