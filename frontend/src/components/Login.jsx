/*
Login component for Scroll Space.
Allows users to log in using JWT authentication and redirects to the dashboard.
*/

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.API_URL}/token/`, { username, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(setCredentials({
        access: response.data.access,
        refresh: response.data.refresh,
        user: { username }
      }));
      setError('');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto card mt-12">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Login</h2>
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
        <button type="submit" className="btn-pink w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;