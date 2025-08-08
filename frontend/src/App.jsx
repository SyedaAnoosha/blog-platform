/*
Main layout for Scroll Space.
Includes navbar with hamburger menu for screens < 490px and home page with platform features.
*/

import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from './store/authSlice';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; 

function App() {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <nav className="bg-pink-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Scroll Space
          </Link>
          {/* Hamburger Icon for Mobile (< 490px) */}
          <div className="custom:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Navigation Links for Desktop (≥ 490px) */}
          <div className="hidden custom:flex items-center space-x-6">
            {accessToken ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-pink-200 transition"
                >
                  Dashboard
                </Link>
                <Link to="/create" className="hover:text-pink-200 transition">
                  Create Blog
                </Link>
                <button onClick={handleLogout} className="btn-pink">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-pink-200 transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-pink-200 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Menu (< 490px) */}
        {isMenuOpen && (
          <div className="custom:hidden bg-pink-600">
            <div className="flex flex-col space-y-2 p-4">
              {accessToken ? (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-pink-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/create"
                    className="hover:text-pink-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Blog
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-pink text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-pink-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-pink-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Main content area */}
      <div className="container mx-auto p-6">
        {window.location.pathname === '/' && (
          <div className="text-center mt-12">
            {/* Welcome message */}
            <h1 className="text-4xl font-bold text-pink-600 mb-6">
              Welcome to Scroll Space
            </h1>
            {/* Description of the platform */}
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Scroll Space is your personal platform to create, edit, and share
              your blogs with the world! Write rich-text blogs, manage your posts,
              and engage with readers through comments. Join now to start telling
              your story!
            </p>
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="card">
                <h3 className="text-xl font-semibold text-pink-600 mb-2">
                  Write Blogs
                </h3>
                <p className="text-gray-600">
                  Use our rich-text editor to create beautiful blog posts with
                  ease.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-pink-600 mb-2">
                  Manage Posts
                </h3>
                <p className="text-gray-600">
                  Edit or delete your blogs anytime from your personal dashboard.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold text-pink-600 mb-2">
                  Engage Readers
                </h3>
                <p className="text-gray-600">
                  Allow readers to comment and interact with your content.
                </p>
              </div>
            </div>
            {!accessToken && (
              <div className="space-x-4">
                <Link to="/login" className="btn-pink inline-block">
                  Login
                </Link>
                <Link to="/register" className="btn-pink inline-block">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default App;