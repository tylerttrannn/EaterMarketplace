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
import SearchListing from './views/SearchListing.tsx';
import { Toaster } from 'sonner';
import About from './views/About.tsx';
import Contact from './views/Contact.tsx';
import Manage from './views/Manage.tsx';
import Edit from './views/Edit.tsx';
import Search from './components/Search/search.tsx';

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
    path: '/listing/:id',
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
  },

  {
    path: '/search/',  
    element: <Search/>,
    errorElement: <NotFoundPage />

  },

  {
    path: '/search/:query',  
    element: <SearchListing />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/about',  
    element: <About />,
    errorElement: <NotFoundPage />
  }, 
  {
    path: '/contact',  
    element: <Contact />,
    errorElement: <NotFoundPage />
  }, 

  {
    path: '/manage',  
    element: <Manage />,
    errorElement: <NotFoundPage />
  }, 

  {
    path: '/edit/:id',  
    element: <Edit />,
    errorElement: <NotFoundPage />
  }, 
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router = {Router}/>
  </StrictMode>,
)
