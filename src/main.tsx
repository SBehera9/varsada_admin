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
import ManageInventory from './components/page/ManageInventory.tsx'
import ManagePromo from './components/page/ManagePromo.tsx'
import Configure from './components/page/Configure.tsx'
import ManageCustomerOrder from './components/page/ManageCustomerOrder.tsx'
import ProductPriceMaster from './components/page/ProductPriceMaster.tsx'
import UplodPriceMaster from './components/page/UplodPriceMaster.tsx'
import Createnewcategory from './components/page/Createnewcategory.tsx'
import Previewproduct from './components/page/PreviewProduct.tsx'
import Offer from './components/page/Offer.tsx'
import Banner from './components/page/BannerImage.tsx'
import BannerImage from './components/page/BannerImage.tsx'

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
    path: '/manageinventory',
    element: <MainLayout children={<ManageInventory />} />,
  },

  {
    path: '/managepromo',
    element: <MainLayout children={<ManagePromo />} />,
  },

  {
    path: '/configure',
    element: <MainLayout children={<Configure />} />,
  },
  
  {
    path: '/managecustomerorder',
    element: <MainLayout children={<ManageCustomerOrder />} />,
  },

  {
    path: '/productpricemaster',
    element: <MainLayout children={<ProductPriceMaster />} />,
  },

  {
    path: '/uplodpricemaster',
    element: <MainLayout children={<UplodPriceMaster/>} />,
  },

  {
    path: '/createnewcategory',
    element: <MainLayout children={<Createnewcategory/>} />,
  },

  {
    path: '/previewproduct',
    element: <MainLayout children={<Previewproduct/>} />,
  },

  {
    path: '/offer',
    element: <MainLayout children={<Offer/>} />,
  },

  {
    path: '/bannerimage',
    element: <MainLayout children={<BannerImage/>} />,
  },
  
  


]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
