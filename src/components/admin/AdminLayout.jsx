import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Inbox, Map, LogOut, ExternalLink, 
  ShieldCheck, User, Compass 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../common/BrandLogo';

export const AdminLayout = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center text-forest-dark">
        Verifying agency credentials...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries & Leads', path: '/admin/enquiries', icon: Inbox },
    { name: 'Destinations & Content', path: '/admin/content', icon: Map },
  ];

  return (
    <div className="min-h-screen bg-ivory flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-forest-dark text-ivory flex flex-col justify-between shrink-0 border-r border-forest-light/40">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-forest-light/30">
            <BrandLogo variant="light" showTagline={false} />
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gold font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} /> Agency Management Desk
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-forest text-gold border border-gold/30 shadow-sm'
                      : 'text-ivory/80 hover:bg-forest/50 hover:text-ivory'
                  }`}
                >
                  <Icon size={16} className={active ? 'text-gold' : 'text-ivory/70'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-forest-light/30 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-gold text-xs font-bold">
              <User size={14} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-ivory truncate">{user?.name || 'Staff'}</p>
              <p className="text-[10px] text-ivory/60 truncate">{user?.email || 'admin@thememorabletrip.com'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-forest-light/20 text-xs">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/70 hover:text-gold flex items-center gap-1 text-[11px]"
            >
              <ExternalLink size={12} /> View Public Site
            </a>

            <button
              onClick={logout}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px]"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
