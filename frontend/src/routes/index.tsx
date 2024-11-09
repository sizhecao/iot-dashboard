import { RouteObject } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFound";
import SettingsPage from "../pages/Settings";
import AlertsPage from "../pages/Alerts";
import DevicesPage from "../pages/Devices";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/devices',
    element: <DevicesPage />,
  },
  {
    path: '/alerts',
    element: <AlertsPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]