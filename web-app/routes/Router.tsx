import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';

const router = () => {


    return createBrowserRouter (
        createRoutesFromElements (
            <>
                <Route index element={<Home />} />
            </>
        )
    );
};

export default router;