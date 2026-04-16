import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit2, Star, Box, ShieldCheck, Truck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
const fetchProduct = async () => {
      try {
        setLoading(true); setError('');
        // ИСПРАВЛЕНО: Теперь запрашиваем данные из Makeup API по ID
        const response = await axios.get(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
        
        // Мапим данные, чтобы они подходили под твой интерфейс
        const p = response.data;
        setProduct({
          title: p.name,
          brand: p.brand,
          price: parseFloat(p.price) || 15.00,
          thumbnail: p.image_link,
          description: p.description,
          category: p.product_type || 'makeup',
          rating: p.rating || 4.5,
          stock: 12, // В Makeup API нет поля stock, ставим заглушку
          warrantyInformation: "Premium Quality",
          shippingInformation: "Standard shipping 3-5 days"
        });
      } catch { 
        setError('Beauty product not found.'); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex flex-col justify-center items-center h-64 space-y-4"><div className="w-10 h-10 border-4 border-pink-200 border-t-rose-500 rounded-full animate-spin" /><p className="text-slate-500 font-medium animate-pulse">Loading beauty details...</p></div>;

  if (error || !product) return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-md mx-auto mt-12 shadow-sm">
      <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Error</h3>
      <p className="text-red-600 mb-6 font-medium">{error}</p>
      <Link to="/dashboard/products" className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl text-rose-600 font-bold border border-rose-200 shadow-sm"><ArrowLeft size={18} /> Back to Products</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/products" className="p-2.5 bg-white text-slate-400 hover:text-rose-500 border border-transparent rounded-2xl transition-colors shadow-sm"><ArrowLeft size={20} /></Link>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Product Details</h1>
        </div>
        <Link to={`/dashboard/products/${id}/edit`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-rose-200 hover:bg-pink-50 text-rose-600 text-sm font-bold rounded-2xl transition-colors shadow-sm">
          <Edit2 size={16} /> Edit Product
        </Link>
      </div>
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-pink-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-rose-100 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-transparent" />
            <img src={product.thumbnail} alt={product.title} className="max-h-[28rem] w-full object-contain mix-blend-multiply drop-shadow-md z-10 hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-8 md:p-10 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-bold rounded-full capitalize">{product.category.replace('-',' ')}</span>
                <span className="flex items-center gap-1.5 text-sm text-slate-600 font-bold"><Star size={16} className="text-amber-400 fill-amber-400" />{product.rating} Rating</span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{product.title}</h2>
              <p className="text-lg text-slate-400 font-medium mt-1">{product.brand || 'No Brand'}</p>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
            <div className="flex items-end gap-3 pb-8 border-b border-rose-50">
              <span className="text-5xl font-extrabold text-rose-600">${product.price.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Box, color:'pink', label:'Stock Status', value:`${product.stock} units` },
                { icon: ShieldCheck, color:'purple', label:'Warranty', value: product.warrantyInformation || 'Standard' },
              ].map(({ icon: Icon, color, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-rose-100 shadow-sm">
                  <div className={`bg-${color}-100 text-${color}-500 p-2.5 rounded-xl`}><Icon size={22} /></div>
                  <div><p className="text-xs text-slate-400 font-semibold uppercase">{label}</p><p className="font-bold text-slate-800">{value}</p></div>
                </div>
              ))}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-rose-100 shadow-sm col-span-2">
                <div className="bg-fuchsia-100 text-fuchsia-500 p-2.5 rounded-xl"><Truck size={22} /></div>
                <div><p className="text-xs text-slate-400 font-semibold uppercase">Shipping</p><p className="font-bold text-slate-800">{product.shippingInformation || 'Ships in 1-2 business days'}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
