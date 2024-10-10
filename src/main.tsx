import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from "./views/NotFoundPage.tsx";
import Login from "./views/Login.tsx";
import Dashboard from "./views/Dashboard.tsx";



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


  }
  
]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {Router}/>
  </StrictMode>,
)
