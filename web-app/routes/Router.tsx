import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';

const router = (isAuthenticated, setIsAuthenticated, setUserInfo) => createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />}
      />
      <Route
        path="home"
        element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />}
      />
      <Route
        path="login"
        element={<Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />}
      />
    </Route>
  )
);

export default router;
