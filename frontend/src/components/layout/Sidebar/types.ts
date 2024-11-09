export interface SidebarProps {
  collapsed?: boolean;
  className?: string;
}

export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}
