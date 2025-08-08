/*
BlogDetail component for Scroll Space.
Shows a blog post's details, allows deletion, and manages comments.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.API_URL}/blogs/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBlog(response.data);
      } catch{
        setError('Failed to load blog.');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.API_URL}/comments/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setComments(response.data.filter((c) => c.blog === parseInt(id)));
      } catch{
        setError('Failed to load comments.');
      }
    };

    if (accessToken) {
      fetchBlog();
      fetchComments();
    }
  }, [id, accessToken]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.API_URL}/comments/`,
        { blog: id, content: commentContent },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCommentContent('');
      const response = await axios.get(`${import.meta.env.API_URL}/comments/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setComments(response.data.filter((c) => c.blog === parseInt(id)));
      setError('');
    } catch{
      setError('Failed to post comment.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.API_URL}/blogs/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      navigate('/dashboard');
    } catch{
      setError('Failed to delete blog.');
    }
  };

  if (!blog) return <div className="text-pink-600 text-center mt-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto card mt-12">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">{blog.title}</h2>
      <p className="text-gray-600 mb-6">
        By {blog.author.username} on {new Date(blog.created_at).toLocaleDateString()}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <button onClick={handleDelete} className="btn-pink mt-6 bg-red-500 hover:bg-red-600">
        Delete Blog
      </button>
      <h3 className="text-2xl font-semibold text-pink-600 mt-8 mb-4">Comments</h3>
      {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="btn-pink mt-2">Post Comment</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="border-t pt-4 mt-4">
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-gray-600 text-sm">
              By {comment.author.username} on {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogDetail;