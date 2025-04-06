import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  
  // Format date in a more readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create excerpt with proper length and without cutting words
  const createExcerpt = (text, maxLength = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    
    const trimmedText = text.substr(0, text.lastIndexOf(' ', maxLength));
    return trimmedText + '...';
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold text-blue-700">{blog.title}</h2>
      <p className="text-gray-600 mt-2">{blog.content.slice(0, 50)}...</p>
      <p className="text-sm text-gray-500 mt-2">By {blog.author} - {new Date(blog.created_at).toLocaleDateString()}</p>
      <button 
        onClick={() => navigate(`/blogs/${blog.id}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Read More
      </button>
    </div>
  );
};

export default BlogCard;