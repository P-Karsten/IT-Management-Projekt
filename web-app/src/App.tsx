import { RouterProvider } from 'react-router-dom'
import router from '../routes/Router'
import './App.css'
import React from 'react'

function App() {

const routes = router();

  return (
      <RouterProvider router={routes} />
  );
}

export default App
