import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/common/BrandLogo';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-gold/30">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-forest/10 rounded-2xl text-forest mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-forest-dark">Agency Portal</h1>
          <p className="text-xs text-neutral-grey mt-1">
            The Memorable Trip &bull; Operations & Lead Management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-grey absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@thememorabletrip.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-grey absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-forest hover:bg-forest-dark text-ivory text-xs uppercase tracking-wider font-bold shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-border text-center">
          <p className="text-xs text-neutral-grey mb-3">
            Protected agency system. Default dev admin credentials configured via backend seed.
          </p>
          <a href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline">
            <ArrowLeft size={12} /> Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
