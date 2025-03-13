import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DoctorForm from './pages/DoctorForm';
import DoctorList from './pages/DoctorList';
import DoctorView from './pages/DoctorView';
import PatientForm from './pages/PatientForm';
import PatientList from './pages/PatientList';
import PatientView from './pages/PatientView';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Patient Routes */}
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/edit/:id" element={<PatientForm />} />
        <Route path="/patients/view/:id" element={<PatientView />} />
        
        {/* Doctor Routes */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/add" element={<DoctorForm />} />
        <Route path="/doctors/edit/:id" element={<DoctorForm />} />
        <Route path="/doctors/view/:id" element={<DoctorView />} />
      </Routes>
    </Router>
  );
}

export default App;