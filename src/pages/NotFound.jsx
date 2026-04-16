import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <div className="w-20 h-20 bg-pink-50 text-rose-500 rounded-full border border-rose-100 flex items-center justify-center mb-6 shadow-sm">
      <FileQuestion size={40} />
    </div>
    <h1 className="text-6xl font-extrabold text-slate-900 mb-4">404</h1>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
    <p className="text-slate-500 max-w-md mx-auto mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <Link to="/dashboard" className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-2xl transition-colors shadow-sm">Back to Dashboard</Link>
  </div>
);

export default NotFound;
