import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

import Footer from './Footer';
import Banner from './Banner';
import FreeBook from './FreeBook';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
        <Banner/>
        <FreeBook/>

        
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
