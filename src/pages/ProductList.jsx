import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search, Edit2, Trash2, Eye, AlertCircle, XCircle } from 'lucide-react';

const ProductList = () => {
  const SEARCH_KEY = 'products.searchTerm';
  const SORT_KEY   = 'products.sortOrder';

  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem(SEARCH_KEY) || '');
  const [sortOrder,  setSortOrder]  = useState(() => localStorage.getItem(SORT_KEY)   || 'default');
  const [skip,  setSkip]  = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

const fetchProducts = async (query = '') => {
  try {
    setLoading(true);
    setError('');

    // Используем Makeup API. Мы берем продукты бренда 'maybelline' или 'l'oreal' 
    // для стабильности картинок, либо можно просто все продукты.
    const baseUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json';
    
    // Если есть поиск, добавим параметр бренда или типа продукта
    const url = query 
      ? `${baseUrl}?product_type=${query.toLowerCase()}` 
      : `${baseUrl}?brand=maybelline`; // Выбрал Maybelline, так как у них самые четкие фото

    const res = await axios.get(url);
    
    // Makeup API возвращает массив немного в другом формате, 
    // поэтому "подгоним" его под наши карточки (thumbnail, title, price)
    const formattedProducts = res.data.slice(0, 50).map(p => ({
      id: p.id,
      title: p.name,
      brand: p.brand,
      price: parseFloat(p.price) || 10.00, // Если цены нет, ставим 10$
      thumbnail: p.image_link,
      category: p.product_type || 'makeup',
      stock: Math.floor(Math.random() * 100) // Генерируем остаток для красоты
    }));

    setProducts(formattedProducts);
    setTotal(formattedProducts.length);
  } catch (err) {
    setError('Не удалось загрузить косметику. Попробуй позже!');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    const t = setTimeout(() => { setSkip(0); fetchProducts(searchTerm, 0); }, 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => { localStorage.setItem(SEARCH_KEY, searchTerm); }, [searchTerm]);
  useEffect(() => { localStorage.setItem(SORT_KEY,   sortOrder);  }, [sortOrder]);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      setProducts(p => p.filter(x => x.id !== id));
      setTotal(t => t - 1);
    } catch { alert('Error deleting product'); }
  };

  const handleNext = () => { if (skip + limit < total) { const n = skip + limit; setSkip(n); fetchProducts(searchTerm, n); } };
  const handlePrev = () => { if (skip > 0) { const n = Math.max(0, skip - limit); setSkip(n); fetchProducts(searchTerm, n); } };

  const sorted = [...products].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : sortOrder === 'desc' ? b.price - a.price : 0
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your beautiful catalog</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto bg-pink-50/60 border border-rose-100 rounded-2xl p-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search products..."
              className="pl-9 pr-4 py-2.5 sm:py-2 bg-white border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 w-full lg:w-64 shadow-sm text-slate-700" />
          </div>
          <select 
  value={sortOrder} 
  onChange={e => setSortOrder(e.target.value)}
  className="appearance-none pl-4 pr-10 py-2.5 sm:py-2 bg-white border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm text-slate-700 cursor-pointer w-full sm:w-auto bg-no-repeat"
  style={{ 
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fb7185' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.2em'
  }}
>
  <option value="default">Sort: None</option>
  <option value="asc">Price: Low → High</option>
  <option value="desc">Price: High → Low</option>
</select>
          <Link to="/dashboard/products/create" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-2xl shadow-sm shrink-0 w-full sm:w-auto">
            <Plus size={18} /><span>Add Product</span>
          </Link>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-600">{error}</p>
          <button onClick={() => fetchProducts(searchTerm, skip)} className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-2xl">Try Again</button>
        </div>
      ) : (
        <div className="bg-white border border-rose-100 rounded-2xl shadow-sm overflow-hidden relative min-h-[400px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin" />
              <p className="text-rose-400 font-medium animate-pulse">Fetching beauty...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4"><XCircle className="w-8 h-8 text-rose-300" /></div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
              <p className="text-slate-500 mb-6 max-w-sm">Nothing matching "{searchTerm}". Try adjusting your search.</p>
              <button onClick={() => setSearchTerm('')} className="px-6 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold rounded-2xl">Clear Search</button>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="md:hidden p-4 space-y-3 bg-rose-50/20">
                {sorted.map(p => (
                  <div key={p.id} className="bg-white border border-rose-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-pink-50 border border-rose-100 overflow-hidden shrink-0">
                        <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-800 truncate">{p.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{p.category.replace('-',' ')}</p>
                      </div>
                      <p className="text-base font-bold text-rose-600 shrink-0">${p.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className={`px-3 py-1 rounded-2xl text-xs font-semibold border ${p.stock>50?'bg-emerald-50 text-emerald-600 border-emerald-200':p.stock>0?'bg-amber-50 text-amber-600 border-amber-200':'bg-rose-50 text-rose-600 border-rose-200'}`}>{p.stock} in stock</span>
                      <div className="flex gap-2">
                        <Link to={`/dashboard/products/${p.id}`} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100"><Eye size={17} /></Link>
                        <Link to={`/dashboard/products/${p.id}/edit`} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100"><Edit2 size={17} /></Link>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100"><Trash2 size={17} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-pink-50/50 text-slate-600 font-semibold border-b border-rose-100">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-50 text-slate-700">
                    {sorted.map(p => (
                      <tr key={p.id} className="hover:bg-rose-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-rose-100 overflow-hidden shrink-0">
                              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{p.title}</p>
                              <p className="text-xs text-slate-400 truncate w-48">{p.brand || 'Unbranded'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize text-slate-600">{p.category.replace('-',' ')}</td>
                        <td className="px-6 py-4 font-bold text-rose-600">${p.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-2xl text-xs font-semibold border ${p.stock>50?'bg-emerald-50 text-emerald-600 border-emerald-200':p.stock>0?'bg-amber-50 text-amber-600 border-amber-200':'bg-rose-50 text-rose-600 border-rose-200'}`}>{p.stock} in stock</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/dashboard/products/${p.id}`} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100"><Eye size={18} /></Link>
                            <Link to={`/dashboard/products/${p.id}/edit`} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100"><Edit2 size={18} /></Link>
                            <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-rose-100 bg-pink-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                <p className="text-sm text-slate-500">Showing <b className="text-rose-600">{skip+1}</b>–<b className="text-rose-600">{Math.min(skip+limit,total)}</b> of <b>{total}</b></p>
                <div className="flex gap-2">
                  <button onClick={handlePrev} disabled={skip===0} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-rose-200 rounded-2xl hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">Previous</button>
                  <button onClick={handleNext} disabled={skip+limit>=total} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-rose-200 rounded-2xl hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
