/*
BlogForm component for Scroll Space.
Allows users to create or edit blog posts using a rich-text editor.
*/

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const quillRef = useRef(null);


  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch {
          setError('Failed to load blog.');
        }
      };
      fetchBlog();
    }
  }, [id, accessToken]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, content }; 

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${id}/`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs/`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      setError('');
      navigate('/dashboard');
    } catch {
      setError('Failed to save blog.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto card mt-12">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">{id ? 'Edit Blog' : 'Create Blog'}</h2>
      {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Content</label>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            className="h-64 bg-white"
          />
        </div>
        <button type="submit" className="btn-pink mt-12">Save</button>
      </form>
    </div>
  );
}

export default BlogForm;