import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../Home';
import App from '../page/App';
import Storename from '../page/Storename';
import Day from '../page/Day';
import Eveing from '../page/Eveing';
import Login from '../page/Login';
import Auth_Login from '../Auth_Login';
import Register from '../page/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/Authan/Login" replace />,
  },
  {
    path: '/Authan',
    element: <Auth_Login />,
    children: [
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'Register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Day />,
      },
      {
        path: 'storename',
        element: <Storename />,
      },
      {
        path: 'app/:Id',
        element: <App />,
      },
      {
        path: 'eveing/:Id',
        element: <Eveing />,
      },
    ],
  },
]);

export default router;
