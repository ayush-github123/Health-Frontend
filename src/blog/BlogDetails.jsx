import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import DOMPurify from "dompurify";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://health-backend-gjoo.onrender.com/blogs/posts/${id}`);
        setBlog(response.data);
        
        try {
          const relatedResponse = await axios.get(`https://health-backend-gjoo.onrender.com/blogs/posts?category=${response.data.category}&limit=3`);
          setRelatedPosts(relatedResponse.data.filter(post => post.id !== id).slice(0, 2));
        } catch (relatedError) {
          console.error("Error fetching related posts:", relatedError);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchBlog();
  }, [id]);

  const renderContent = (content) => {
    if (!content) return null;

    if (/<[a-z][\s\S]*>/i.test(content)) {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />;
    }

    return <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mt-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-red-700">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link to="/blog" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {blog.image && (
          <div className="relative h-72 md:h-96 mb-8 rounded-xl overflow-hidden shadow-xl">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        )}

        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to all posts
          </Link>
        </div>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-10">
            {blog.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {blog.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

            <div className="flex items-center mb-8 text-gray-600">
              {blog.author_avatar && (
                <img src={blog.author_avatar} alt={blog.author} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-gray-200" />
              )}
              <div>
                <p className="font-medium">{blog.author || "Anonymous"}</p>
                <time className="text-sm text-gray-500">{formatDate(blog.created_at)}</time>
                {blog.read_time && <span className="text-sm text-gray-500 ml-3">{blog.read_time} min read</span>}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {renderContent(blog.content)}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
