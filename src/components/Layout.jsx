import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, UserCircle, LogOut, Menu, X, Sparkles } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products',  path: '/dashboard/products', icon: ShoppingBag },
    { name: 'Profile',   path: '/dashboard/profile', icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-pink-50 font-sans">
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-rose-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white text-slate-700 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 border-r border-rose-100 shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-rose-100">
          <span className="text-2xl font-bold tracking-tight text-rose-600 flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500">
              <Sparkles size={20} />
            </div>
            Beautyfly
          </span>
          <button className="lg:hidden text-rose-400 hover:text-rose-600" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-2xl font-medium transition-all ${isActive ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-rose-50/50 hover:text-rose-500'}`}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-rose-100">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl font-medium transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col w-full h-full min-w-0 overflow-hidden">
        <header className="h-16 px-4 lg:px-8 bg-white border-b border-rose-100 flex items-center justify-between z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-rose-500 hover:text-rose-700" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
              Welcome back, {user?.name?.split(' ')[0] || 'Gorgeous'}! 💖
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 hidden sm:block">{user?.name || 'Admin'}</span>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold border-2 border-rose-200 shadow-sm">
              <Sparkles size={18} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-pink-50/30 p-4 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
