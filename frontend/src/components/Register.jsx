/*
Register component for Scroll Space.
Allows users to sign up and redirects to the dashboard upon success.
*/

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store/authSlice';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register/`, { username, email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(setCredentials({
        access: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user
      }));
      setError('');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data
        ? Object.values(err.response.data).flat().join(' ') || 'Registration failed.'
        : 'Registration failed.';
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto card mt-12">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Register</h2>
      {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <button type="submit" className="btn-pink w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;