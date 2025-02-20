import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import MainLayout from '../layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element:(
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  // {
  //   path: '/dashboard',
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <PrivateRoute>
  //           <Statistics />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'add-plant',
  //       element: (
  //         <PrivateRoute>
  //           <AddPlant />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-inventory',
  //       element: (
  //         <PrivateRoute>
  //           <MyInventory />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-users',
  //       element: (
  //         <PrivateRoute>
  //           <ManageUsers />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'profile',
  //       element: (
  //         <PrivateRoute>
  //           <Profile />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'my-orders',
  //       element: (
  //         <PrivateRoute>
  //           <MyOrders />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: 'manage-orders',
  //       element: <ManageOrders />,
  //     },
  //   ],
  // },
])
