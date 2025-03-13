import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { patientApi } from '../services/api';
import Layout from '../components/Layout';

const PatientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getPatientById(id);
      setPatient(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patient data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientApi.deletePatient(id);
        navigate('/patients');
      } catch (err) {
        setError('Failed to delete patient');
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

if (!patient) {
  return (
    <Layout>
      <div className="text-center">Patient not found</div>
    </Layout>
  );
}

return (
  <Layout>
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Patient Information</h1>
      <div className="flex space-x-2">
        <Link
          to={`/patients/edit/${patient._id}`}
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
          to="/patients"
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
            <span className="font-medium text-gray-700">Name:</span> {patient.name}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Age:</span> {patient.age}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Gender:</span> {patient.gender}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Blood Type:</span> {patient.bloodType}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Address:</span> {patient.address}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Phone:</span> {patient.contactInfo.phone}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Email:</span> {patient.contactInfo.email}
          </div>
          <div className="mb-3">
            <span className="font-medium text-gray-700">Emergency Contact:</span> {patient.emergencyContact}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Medical History:</span>
          <p className="mt-2 whitespace-pre-line">{patient.medicalHistory || 'No medical history recorded'}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Insurance Information</h2>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Provider:</span> {patient.insuranceDetails.provider || 'N/A'}
        </div>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Policy Number:</span> {patient.insuranceDetails.policyNumber || 'N/A'}
        </div>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Expiry Date:</span>{' '}
          {patient.insuranceDetails.expiryDate
            ? new Date(patient.insuranceDetails.expiryDate).toLocaleDateString()
            : 'N/A'}
        </div>
      </div>
    </div>
  </Layout>
);
};

export default PatientView;