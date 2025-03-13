import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientApi } from '../services/api';
import Layout from '../components/Layout';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getAllPatients();
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchPatients();
      return;
    }

    try {
      setLoading(true);
      const response = await patientApi.searchPatients(searchQuery);
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientApi.deletePatient(id);
        fetchPatients();
      } catch (err) {
        setError('Failed to delete patient');
        console.error(err);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <Link
          to="/patients/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Patient
        </Link>
      </div>

      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="p-2 border rounded flex-grow mr-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : patients.length === 0 ? (
        <div className="text-center">No patients found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Age</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Blood Type</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{patient.name}</td>
                  <td className="py-2 px-4 border">{patient.age}</td>
                  <td className="py-2 px-4 border">{patient.gender}</td>
                  <td className="py-2 px-4 border">{patient.contactInfo.phone}</td>
                  <td className="py-2 px-4 border">{patient.bloodType}</td>
                  <td className="py-2 px-4 border flex space-x-2">
                    <Link
                      to={`/patients/view/${patient._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/patients/edit/${patient._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default PatientList;