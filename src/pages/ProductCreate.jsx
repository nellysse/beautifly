import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title:'', description:'', price:'', category:'', stock:'' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Required';
    if (!formData.description.trim()) e.description = 'Required';
    if (!formData.price || Number(formData.price) <= 0) e.price = 'Must be > 0';
    if (formData.stock === '' || Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) e.stock = 'Must be integer ≥ 0';
    if (!formData.category.trim()) e.category = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await axios.post('https://dummyjson.com/products/add', { title: formData.title, description: formData.description, price: Number(formData.price), stock: Number(formData.stock), category: formData.category });
      setToast('Product created! (simulated via Mock API)');
      setTimeout(() => navigate('/dashboard/products'), 1500);
    } catch { setErrors({ form: 'Failed to create product.' }); setIsSubmitting(false); }
  };

  const inp = (name, type='text', placeholder='') => (
    <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} step={type==='number'?'0.01':undefined}
      className={`w-full px-5 py-3 rounded-2xl border focus:ring-2 focus:ring-rose-400 focus:outline-none ${errors[name]?'border-red-300 bg-red-50':'border-rose-200 bg-pink-50/50'}`} />
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 relative">
      {toast && <div className="absolute top-0 md:right-0 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-lg flex items-center gap-3 z-50"><CheckCircle2 className="text-emerald-500" size={24} /><p className="text-emerald-800 font-bold">{toast}</p></div>}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/products" className="p-2.5 bg-white text-slate-400 hover:text-rose-500 border border-transparent rounded-2xl shadow-sm"><ArrowLeft size={20} /></Link>
        <div><h1 className="text-3xl font-bold text-slate-800">Create Product</h1><p className="text-sm text-slate-500">Add a beautiful new item</p></div>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 md:p-10">
        {errors.form && <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm">{errors.form}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Product Title *</label>{inp('title','text','e.g. Blossom Lip Gloss')}{errors.title&&<p className="mt-1 text-sm text-red-600">{errors.title}</p>}</div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Description *</label><textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the beauty..." className={`w-full px-5 py-3 rounded-2xl border focus:ring-2 focus:ring-rose-400 focus:outline-none ${errors.description?'border-red-300 bg-red-50':'border-rose-200 bg-pink-50/50'}`}/>{errors.description&&<p className="mt-1 text-sm text-red-600">{errors.description}</p>}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Category *</label>{inp('category','text','e.g. cosmetics')}{errors.category&&<p className="mt-1 text-sm text-red-600">{errors.category}</p>}</div>
              <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Price ($) *</label>{inp('price','number','0.00')}{errors.price&&<p className="mt-1 text-sm text-red-600">{errors.price}</p>}</div>
              <div className="md:col-span-2"><label className="block text-sm font-bold text-slate-700 mb-1.5">Initial Stock *</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className={`w-full md:w-1/2 px-5 py-3 rounded-2xl border focus:ring-2 focus:ring-rose-400 focus:outline-none ${errors.stock?'border-red-300 bg-red-50':'border-rose-200 bg-pink-50/50'}`}/>{errors.stock&&<p className="mt-1 text-sm text-red-600">{errors.stock}</p>}</div>
            </div>
          </div>
          <div className="pt-8 border-t border-rose-100 flex items-center justify-end gap-3">
            <Link to="/dashboard/products" className="px-6 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-2xl bg-white">Cancel</Link>
            <button type="submit" disabled={isSubmitting||!!toast} className="inline-flex items-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-2xl disabled:opacity-70 shadow-md">
              {isSubmitting?'Saving...':<><Save size={18}/> Create Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductCreate;
