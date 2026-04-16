import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Sparkles } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>
        <p className="text-sm text-slate-500">Manage your account settings and preferences.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-rose-400 to-rose-600 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white bg-white">
            <div className="w-full h-full rounded-full bg-pink-50 flex items-center justify-center shadow-inner">
              <Sparkles className="text-rose-500" size={32} />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-slate-900">{user?.name || 'Administrator'}</h2>
          <p className="text-rose-500 font-medium mb-6">Administrator</p>
          <div className="space-y-4">
            {[{ icon: User, label: 'Full Name', value: user?.name },
              { icon: Mail, label: 'Email Address', value: user?.email },
              { icon: Shield, label: 'System Role', value: 'Administrator' }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-3 border-b border-rose-50">
                <div className="bg-pink-50 p-2 rounded-xl text-rose-400"><Icon size={20} /></div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-slate-800 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-2xl transition-colors border border-rose-200">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
