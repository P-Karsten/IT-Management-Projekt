import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../src/layouts/Layout';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Upload from '../src/pages/Upload';
import RevokeToken from '../src/pages/Test';

const router = (isAuthenticated, setIsAuthenticated, setUserInfo) => createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Die Route index oder / wird hier eingeseztz*/}
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
      <Route
        path="upload"
        element={<Upload />}
      />
      <Route
        path="RevokeToken"
        element={<RevokeToken setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />}
      />
    </Route>
  )
);

export default router;
