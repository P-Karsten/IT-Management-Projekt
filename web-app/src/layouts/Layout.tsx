import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.tsx';
import Sidebar from '../components/Sidebar/Sidebar.tsx';
import './layout.css';

const Layout = () => {

  


  return (
    <div className='layout-container'>
      {/* Header wird immer angezeigt */}
      <Sidebar/>
      { /*<Header/> */ }
      {/* Hier werden die verschiedenen Seiteninhalte gerendert */}
      <main className='content'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
