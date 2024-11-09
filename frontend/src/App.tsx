import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: routes,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
