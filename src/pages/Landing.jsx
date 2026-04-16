import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, BarChart2, Shield, Search, ChevronRight, Star, Zap, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-rose-600 flex items-center justify-center shadow-md shadow-rose-200">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="text-xl font-extrabold text-rose-600 tracking-tight">Beautyfly</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-2xl transition-colors shadow-md shadow-rose-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 rounded-full text-rose-600 text-sm font-semibold mb-8 shadow-sm">
            <Zap size={14} />
            Admin dashboard for beauty brands
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Manage your beauty{' '}
            <span className="text-rose-600 relative">
              empire
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-rose-200 rounded-full" />
            </span>
            {' '}with ease
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Beautyfly gives beauty brands a powerful, elegant dashboard to manage products, track inventory, and grow their catalog — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all hover:-translate-y-0.5"
            >
              Start for free <ChevronRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-pink-50 text-slate-700 text-base font-bold rounded-2xl border border-rose-200 shadow-sm transition-all"
            >
              Sign in to beautifly
            </Link>
          </div>

          {/* mini social proof */}
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
            <div className="flex -space-x-2">
              {['bg-rose-300', 'bg-pink-400', 'bg-fuchsia-300', 'bg-purple-300'].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                  {['A', 'B', 'C', 'D'][i]}
                </div>
              ))}
            </div>
            <span>Trusted by <strong className="text-slate-600">20+</strong> beauty brands</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Everything you need to run your store</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">From inventory to analytics — Beautyfly handles the details so you can focus on what you love.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingBag,
                color: 'rose',
                title: 'Product Management',
                desc: 'Create, edit, and delete products with a beautiful form UI. Full CRUD with instant feedback.'
              },
              {
                icon: Search,
                color: 'pink',
                title: 'Live Search & Filter',
                desc: 'Debounced real-time search with dynamic sorting by price. Find any product in milliseconds.'
              },
              {
                icon: BarChart2,
                color: 'fuchsia',
                title: 'Dashboard Analytics',
                desc: 'Get a bird\'s eye view of your total products, categories, stock levels, and average ratings.'
              },
              {
                icon: Shield,
                color: 'purple',
                title: 'Secure Auth',
                desc: 'Full register & login flow with protected routes. Only authorized users access the dashboard.'
              },
              {
                icon: Zap,
                color: 'amber',
                title: 'Blazing Fast',
                desc: 'Built on Vite + React 19 with Tailwind CSS 4. Near-instant page loads and smooth transitions.'
              },
              {
                icon: Users,
                color: 'emerald',
                title: 'User Profiles',
                desc: 'Personalized profile pages showing user data registered in the current session.'
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="group p-6 rounded-3xl border border-slate-100 hover:border-rose-200 bg-white hover:bg-rose-50/30 transition-all shadow-sm hover:shadow-md">
                <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-500 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: '20+', label: 'Brands onboard' },
            { value: '10+', label: 'Products managed' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '4.8★', label: 'Average rating' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="mt-1 text-rose-200 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-pink-50/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">Loved by beauty entrepreneurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aisha K.',
                role: 'Founder, GlowCo',
                text: 'Beautyfly replaced three spreadsheets and saved us 10 hours a week. The UI is genuinely gorgeous.',
              },
              {
                name: 'Sara M.',
                role: 'Head of Product, PinkBloom',
                text: 'Setup took 5 minutes. The live search and pagination work flawlessly on our  catalog.',
              },
              {
                name: 'Lena V.',
                role: 'CEO, VelvetLip',
                text: 'I love how the dashboard gives me a full overview the second I log in. Clean, fast, and beautiful.',
              },
            ].map(({ name, role, text }) => (
              <div key={name} className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{name}</p>
                  <p className="text-xs text-slate-400">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-rose-500" size={28} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Ready to fly?</h2>
          <p className="text-slate-500 mb-8 text-lg">Create your free account and start managing your beauty catalog today.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all hover:-translate-y-0.5"
          >
            Create free account <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rose-100 py-8 px-6 bg-pink-50/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-xl bg-rose-600 flex items-center justify-center">
              <Sparkles className="text-white" size={12} />
            </div>
            <span className="font-extrabold text-rose-600 text-sm">Beautyfly</span>
          </div>
          <p className="text-xs text-slate-400">© Zhanel cooked</p>
          <div className="flex gap-4 text-xs text-slate-400">
            <Link to="/login" className="hover:text-rose-500 transition-colors">Sign in</Link>
            <Link to="/register" className="hover:text-rose-500 transition-colors">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
