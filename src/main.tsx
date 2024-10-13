import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from "./views/NotFoundPage.tsx";
import Login from "./views/Login.tsx";
import Dashboard from "./views/Dashboard.tsx";
import CreateListing from './views/CreateListing.tsx';
import ItemListing from './views/ItemListing.tsx';
import Chatbox from './components/Chatbox/Chatbox.tsx';
import CategoryPage from './views/CategoryPage.tsx';
import Profile from './views/Profile.tsx';
import Settings from './views/Settings.tsx';



const Router = createBrowserRouter([

  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>

  },

  {
    path: '/login',
    element: <Login/>,
    errorElement: <NotFoundPage/>

  },

  {
    path: '/dashboard',
    element: <Dashboard/>,
    errorElement: <NotFoundPage/>
  },

  {
    path: '/create',
    element: <CreateListing/>,
    errorElement: <NotFoundPage/>
  },

  {
    path: '/listing',
    element: <ItemListing/>,
    errorElement: <NotFoundPage/>
  },

  {
    path: '/inbox',
    element: <Chatbox/>,
    errorElement: <NotFoundPage/>
  },

  {
    path: '/category/:category',  
    element: <CategoryPage />,
    errorElement: <NotFoundPage />
  },

  {
    path: '/profile',  
    element: <Profile />,
    errorElement: <NotFoundPage />
  },

  {
    path: '/settings',  
    element: <Settings />,
    errorElement: <NotFoundPage />
  }


  
]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {Router}/>
  </StrictMode>,
)
