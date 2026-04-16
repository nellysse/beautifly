import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 600));
      const storedUserData = localStorage.getItem('user');
      if (!storedUserData) { setError('No account found. Please register first.'); setLoading(false); return; }
      const user = JSON.parse(storedUserData);
      if (user.email === email && user.password === password) {
        localStorage.setItem('token', 'fake-beautyfly-token');
        navigate('/dashboard');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } catch {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors">
            <Sparkles className="text-white" size={28} />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-800 tracking-tight">Welcome to Beautyfly</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Sign in to manage your empire</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-rose-100/50 sm:rounded-3xl sm:px-10 border border-pink-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-4 py-3 border border-pink-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-4 py-3 border border-pink-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-2xl shadow-md shadow-rose-200 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all">
              {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
              {loading ? 'Signing in...' : 'Sign in to Beautyfly'}
            </button>
            <div className="text-center pt-2">
              <span className="text-slate-500 text-sm">Don't have an account? </span>
              <Link to="/register" className="text-sm font-bold text-rose-600 hover:underline">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
