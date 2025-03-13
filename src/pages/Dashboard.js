import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientApi, doctorApi } from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [patientsResponse, doctorsResponse] = await Promise.all([
        patientApi.getAllPatients(),
        doctorApi.getAllDoctors()
      ]);
      
      setStats({
        totalPatients: patientsResponse.data.length,
        totalDoctors: doctorsResponse.data.length
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading dashboard data...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hospital Management Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">{stats.totalPatients}</span>
            <span className="ml-2 text-gray-600">Total Patients</span>
          </div>
          <div className="mt-6">
            <Link 
              to="/patients"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block"
            >
              Manage Patients
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Doctor Management</h2>
          <div className="mb-4">
            <span className="text-3xl font-bold text-green-600">{stats.totalDoctors}</span>
            <span className="ml-2 text-gray-600">Total Doctors</span>
          </div>
          <div className="mt-6">
            <Link 
              to="/doctors"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block"
            >
              Manage Doctors
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/patients/add"
            className="bg-blue-100 hover:bg-blue-200 p-4 rounded flex items-center"
          >
            <div className="bg-blue-500 text-white p-2 rounded mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span>Add New Patient</span>
          </Link>
          <Link
            to="/doctors/add"
            className="bg-green-100 hover:bg-green-200 p-4 rounded flex items-center"
          >
            <div className="bg-green-500 text-white p-2 rounded mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span>Add New Doctor</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;