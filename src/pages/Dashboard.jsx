import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Tags, TrendingUp, AlertCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, totalStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Запрашиваем данные по бренду Maybelline для статистики
        const res = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
        
        const products = res.data;
        // Вычисляем уникальные категории из списка продуктов
        const uniqueCategories = [...new Set(products.map(p => p.product_type))];
        
        setStats({
          totalProducts: products.length,
          totalCategories: uniqueCategories.length,
          // Имитируем общее количество товара (т.к. в API нет поля stock)
          totalStock: products.length * 15, 
        });
      } catch { 
        setError('Failed to load beauty metrics.'); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="w-10 h-10 border-4 border-pink-200 border-t-rose-500 rounded-full animate-spin" /></div>;
  if (error) return <div className="bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-700 border border-red-200"><AlertCircle size={20} /><p>{error}</p></div>;

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'rose' },
    { title: 'Categories', value: stats.totalCategories, icon: Tags, color: 'fuchsia' },
    { title: 'Total Units in Stock', value: stats.totalStock, icon: ShoppingCart, color: 'pink' },
    { title: 'Avg Rating', value: '4.7', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Quick summary of your beautiful inventory.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">{stat.title}</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500`}><stat.icon size={26} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium">
              <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+2.5%</span>
              <span className="text-slate-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white border border-rose-100 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          {/* Пути остались без изменений, как ты и просила */}
          <Link to="/dashboard/products" className="px-6 py-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-rose-600 font-bold rounded-2xl transition-colors shadow-sm">Manage Products</Link>
          <Link to="/dashboard/products/create" className="px-6 py-3 bg-rose-600 hover:bg-rose-700 shadow-md text-white font-bold rounded-2xl transition-colors">Add New Product</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;