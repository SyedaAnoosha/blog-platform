/*
Dashboard component for Scroll Space.
Shows the user's blogs, a welcome message, and a button to create new blogs.
*/

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    if (accessToken) fetchBlogs();
  }, [accessToken]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">
        Welcome to Scroll Space, {user?.username || 'User'}!
      </h2>
      <p className="text-gray-700 mb-6">
        You have {blogs.length} blog{blogs.length !== 1 ? 's' : ''} on Scroll Space.
      </p>
      <Link
        to="/create"
        className="btn-pink mb-6 inline-block"
      >
        Create New Blog
      </Link>
      <h3 className="text-2xl font-semibold text-pink-600 mb-4">Your Blogs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p className="text-gray-600">No blogs yet. Start by creating one!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="card">
              <h4 className="text-xl font-semibold text-gray-800">{blog.title}</h4>
              <p className="text-gray-600">
                By {blog.author.username} on {new Date(blog.created_at).toLocaleDateString()}
              </p>
              <div className="mt-4 space-x-4">
                <Link to={`/blog/${blog.id}`} className="text-pink-500 hover:text-pink-700 transition">
                  View
                </Link>
                <Link to={`/edit/${blog.id}`} className="text-pink-500 hover:text-pink-700 transition">
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;