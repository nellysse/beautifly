import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Loader2, Sparkles } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!formData.name || !formData.email || !formData.password) { setError('All fields are required.'); setLoading(false); return; }
    try {
      localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }));
      await new Promise(r => setTimeout(r, 600));
      navigate('/login');
    } catch { setError('Registration failed. Please try again.'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors">
            <Sparkles className="text-white" size={28} />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-800 tracking-tight">Join Beautyfly</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Or <Link to="/login" className="text-rose-600 font-bold hover:underline">sign in to your existing account</Link></p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-rose-100/50 sm:rounded-3xl sm:px-10 border border-pink-100">
          {error && <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl"><p className="text-sm text-red-700 font-medium">{error}</p></div>}
          <form className="space-y-6" onSubmit={handleRegister}>
            {['name','email','password'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-slate-700 capitalize">{field === 'name' ? 'Full Name' : field === 'email' ? 'Email address' : 'Password'}</label>
                <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} name={field} required value={formData[field]} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-4 py-3 border border-pink-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm" />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-2xl shadow-md shadow-rose-200 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all">
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
              {loading ? 'Creating...' : 'Register'}
            </button>
            <div className="text-center pt-2">
              <span className="text-slate-500 text-sm">Already registered? </span>
              <Link to="/login" className="text-sm font-bold text-rose-600 hover:underline">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
