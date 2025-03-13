import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorApi } from '../services/api';
import Layout from '../components/Layout';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorApi.getAllDoctors();
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchDoctors();
      return;
    }

    try {
      setLoading(true);
      const response = await doctorApi.searchDoctors(searchQuery);
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorApi.deleteDoctor(id);
        fetchDoctors();
      } catch (err) {
        setError('Failed to delete doctor');
        console.error(err);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Management</h1>
        <Link
          to="/doctors/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Doctor
        </Link>
      </div>

      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search by name, specialization, or department..."
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
      ) : doctors.length === 0 ? (
        <div className="text-center">No doctors found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Specialization</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Experience</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{doctor.name}</td>
                  <td className="py-2 px-4 border">{doctor.specialization}</td>
                  <td className="py-2 px-4 border">{doctor.department}</td>
                  <td className="py-2 px-4 border">{doctor.yearsOfExperience} years</td>
                  <td className="py-2 px-4 border">{doctor.contactInfo.phone}</td>
                  <td className="py-2 px-4 border flex space-x-2">
                    <Link
                      to={`/doctors/view/${doctor._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/doctors/edit/${doctor._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doctor._id)}
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

export default DoctorList;