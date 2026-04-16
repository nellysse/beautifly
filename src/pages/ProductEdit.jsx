import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, CheckCircle2, RotateCw } from 'lucide-react';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title:'', description:'', price:'', category:'', stock:'' });
  const [errors, setErrors] = useState({});
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Используем Makeup API
    axios.get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then(r => setFormData({ 
        title: r.data.name, 
        description: r.data.description, 
        price: r.data.price || 15.0, 
        category: r.data.product_type || 'makeup', 
        stock: 12 
      }))
      .catch(() => setFetchError('Could not load beauty product details.'))
      .finally(() => setIsLoadingInitial(false));
  }, [id]);

  const validate = () => {
    const e = {};
    if (!formData.title?.trim()) e.title = 'Required';
    if (!formData.description?.trim()) e.description = 'Required';
    if (!formData.price || Number(formData.price) <= 0) e.price = 'Must be > 0';
    if (formData.stock===''||formData.stock===null||Number(formData.stock)<0||!Number.isInteger(Number(formData.stock))) e.stock = 'Must be integer ≥ 0';
    if (!formData.category?.trim()) e.category = 'Required';
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
      // Имитация обновления для API
      await axios.put(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`, { 
        name: formData.title, 
        description: formData.description, 
        price: Number(formData.price) 
      });
      setToast('Beauty Product Updated!');
      // Использование относительного перехода на уровень выше
      setTimeout(() => navigate('..', { relative: 'path' }), 1500);
    } catch { 
      setToast('Updated! (Local simulation)');
      setTimeout(() => navigate('..', { relative: 'path' }), 1500);
    }
  };

  if (isLoadingInitial) return <div className="flex flex-col items-center justify-center p-20 space-y-4"><RotateCw className="w-10 h-10 text-rose-500 animate-spin" /><p className="text-rose-400 font-bold">Loading beauty form...</p></div>;
  
  if (fetchError) return (
    <div className="bg-red-50 p-8 rounded-3xl border border-red-200 max-w-lg mx-auto text-center mt-10">
      <h3 className="text-red-800 font-bold">{fetchError}</h3>
      <Link to=".." relative="path" className="mt-4 inline-block text-rose-600 font-bold underline">Return to products</Link>
    </div>
  );

  const inp = (name, type='text') => (
    <input type={type} name={name} value={formData[name]} onChange={handleChange} step={type==='number'?'0.01':undefined}
      className={`w-full px-5 py-3 rounded-2xl border focus:ring-2 focus:ring-rose-400 focus:outline-none ${errors[name]?'border-red-300 bg-red-50':'border-rose-200 bg-pink-50/50'}`} />
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 relative pb-10">
      {toast && <div className="absolute top-0 md:right-0 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-lg flex items-center gap-3 z-50"><CheckCircle2 className="text-emerald-500" size={24}/><p className="text-emerald-800 font-bold">{toast}</p></div>}
      
      <div className="flex items-center gap-4">
        {/* Относительная ссылка назад */}
        <Link to=".." relative="path" className="p-2.5 bg-white text-slate-400 hover:text-rose-500 border border-transparent rounded-2xl shadow-sm"><ArrowLeft size={20}/></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Edit Beauty Product</h1>
          <p className="text-sm text-slate-500">ID: {id}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Product Name *</label>{inp('title')}{errors.title&&<p className="mt-1 text-sm text-red-600">{errors.title}</p>}</div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" 
                className={`w-full px-5 py-3 rounded-2xl border focus:ring-2 focus:ring-rose-400 focus:outline-none ${errors.description?'border-red-300 bg-red-50':'border-rose-200 bg-pink-50/50'}`}/>
              {errors.description&&<p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Category *</label>{inp('category')}{errors.category&&<p className="mt-1 text-sm text-red-600">{errors.category}</p>}</div>
              <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Price ($) *</label>{inp('price','number')}{errors.price&&<p className="mt-1 text-sm text-red-600">{errors.price}</p>}</div>
            </div>
          </div>
          <div className="pt-8 border-t border-rose-100 flex items-center justify-end gap-3">
            {/* Относительная ссылка назад */}
            <Link to=".." relative="path" className="px-6 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-2xl bg-white">Cancel</Link>
            <button type="submit" disabled={isSubmitting||!!toast} className="inline-flex items-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-2xl disabled:opacity-70 shadow-md">
              {isSubmitting ? 'Updating...' : <><Save size={18}/> Update Details</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;