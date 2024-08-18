import { RouteObject } from 'react-router-dom';

// Root
import App from '../App';

// Pages
import MainPage from '../../ui/pages/Main.page';
import ErrorPage from '../../ui/pages/Error.page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <MainPage /> }],
  },
];

export default routes;
