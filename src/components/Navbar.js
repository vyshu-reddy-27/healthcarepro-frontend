import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Hospital Management System
        </Link>
        <div className="flex space-x-4">
          <Link to="/patients" className="text-white hover:text-blue-200">
            Patients
          </Link>
          <Link to="/doctors" className="text-white hover:text-blue-200">
            Doctors
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
