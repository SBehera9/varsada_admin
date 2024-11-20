import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AdminLogin } from './components/page/AdminLogin.tsx'
import Dashboard from './components/page/DashBoard.tsx'
import MainLayout from './components/UI/layout/MainLayout.tsx'
import Profile from './components/page/Profile.tsx'
import ManageOrder from './components/page/ManageOrder.tsx'
import AccountDetails from './components/page/AccountDetails.tsx'
import SellerAccount from './components/page/SellerAccount.tsx'
import ShippingIteams from './components/page/ShippingIteams.tsx'
import ManageInventory from './components/page/ManageInventory.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AdminLogin />
  },
  {
    path: '/',
    element: <MainLayout children={<Dashboard />} />,
  },
  {
    path: '/profile',
    element: <MainLayout children={<Profile />} />,
  },
  {
    path: '/manageorder',
    element: <MainLayout children={<ManageOrder />} />,
  },
  {
    path: '/accountdetails',
    element: <MainLayout children={<AccountDetails />} />,
  },
  {
    path: '/selleraccount',
    element: <MainLayout children={<SellerAccount />} />,
  },
  
  {
    path: '/shippingiteams',
    element: <MainLayout children={<ShippingIteams />} />,
  },

  {
    path: '/manageinventory',
    element: <MainLayout children={<ManageInventory />} />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
