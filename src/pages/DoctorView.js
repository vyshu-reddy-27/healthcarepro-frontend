import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doctorApi } from '../services/api';
import Layout from '../components/Layout';

const DoctorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const response = await doctorApi.getDoctorById(id);
      setDoctor(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch doctor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorApi.deleteDoctor(id);
        navigate('/doctors');
      } catch (err) {
        setError('Failed to delete doctor');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center">Loading...</div>
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

  if (!doctor) {
    return (
      <Layout>
        <div className="text-center">Doctor not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Information</h1>
        <div className="flex space-x-2">
          <Link
            to={`/doctors/edit/${doctor._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
          >
            Delete
          </button>
          <Link
            to="/doctors"
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Name:</span> {doctor.name}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Specialization:</span> {doctor.specialization}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Department:</span> {doctor.department}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Years of Experience:</span> {doctor.yearsOfExperience}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">License Number:</span> {doctor.licenseNumber}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Phone:</span> {doctor.contactInfo.phone}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Email:</span> {doctor.contactInfo.email}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Office Hours:</span> {doctor.officeHours}
            </div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">Emergency Contact:</span> {doctor.emergencyContact}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Education & Qualifications</h2>
          <p className="whitespace-pre-line">{doctor.education}</p>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorView;