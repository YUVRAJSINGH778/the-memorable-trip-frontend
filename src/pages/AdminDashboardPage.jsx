import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, Users, Clock, Send, CheckCircle2, 
  MapPin, ArrowUpRight, AlertCircle, RefreshCw 
} from 'lucide-react';
import adminService from '../services/adminService';
import { formatDate, getStatusBadgeClass } from '../utils/formatters';

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    followUpRequired: 0,
    quotationsSent: 0,
    confirmedBookings: 0,
    destinationsBreakdown: {
      'Meghalaya': 0,
      'Assam & Guwahati': 0,
      'Sikkim': 0,
    }
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const metricsData = await adminService.getMetrics();
      if (metricsData) {
        setMetrics(metricsData);
      }
      const enquiriesData = await adminService.getEnquiries({ page: 0, size: 5 });
      setRecentEnquiries(enquiriesData?.content || enquiriesData || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest-dark">Operations Overview</h1>
          <p className="text-xs text-neutral-grey mt-1">Real-time enquiries, follow-ups, and quotation pipeline.</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-border text-xs font-semibold text-charcoal hover:bg-ivory transition-colors shadow-soft"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-border shadow-soft">
          <div className="flex items-center justify-between text-neutral-grey mb-2">
            <span className="text-xs uppercase font-semibold">Total Leads</span>
            <Inbox size={16} className="text-forest" />
          </div>
          <div className="text-3xl font-serif font-bold text-forest-dark">{metrics.totalEnquiries}</div>
          <p className="text-[11px] text-neutral-grey mt-1">All-time enquiries</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-soft bg-blue-50/20">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs uppercase font-semibold">New Unread</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <div className="text-3xl font-serif font-bold text-blue-900">{metrics.newEnquiries}</div>
          <p className="text-[11px] text-blue-600 mt-1">Require initial review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-soft bg-purple-50/20">
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-xs uppercase font-semibold">Follow-Up Due</span>
            <Clock size={16} className="text-purple-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-purple-900">{metrics.followUpRequired}</div>
          <p className="text-[11px] text-purple-600 mt-1">Contact scheduled</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-soft bg-teal-50/20">
          <div className="flex items-center justify-between text-teal-700 mb-2">
            <span className="text-xs uppercase font-semibold">Quotes Sent</span>
            <Send size={16} className="text-teal-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-teal-900">{metrics.quotationsSent}</div>
          <p className="text-[11px] text-teal-600 mt-1">Proposals under review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-soft bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs uppercase font-semibold">Confirmed</span>
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-900">{metrics.confirmedBookings}</div>
          <p className="text-[11px] text-emerald-600 mt-1">Booked journeys</p>
        </div>
      </div>

      {/* Destination Volume Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft">
        <h2 className="text-lg font-serif font-bold text-forest-dark mb-4">Destination Enquiry Distribution</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(metrics.destinationsBreakdown || {}).map(([dest, count]) => (
            <div key={dest} className="p-4 rounded-xl bg-ivory border border-neutral-border">
              <span className="text-xs text-neutral-grey font-medium block">{dest}</span>
              <span className="text-2xl font-bold text-forest-dark mt-1 block">{count}</span>
              <span className="text-[11px] text-gold-dark mt-0.5 block">enquiries requested</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-neutral-border shadow-soft overflow-hidden">
        <div className="p-6 border-b border-neutral-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-forest-dark">Recent Travel Enquiries</h2>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-forest hover:text-gold flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory text-neutral-grey uppercase tracking-wider font-semibold border-b border-neutral-border">
              <tr>
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Travellers</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border/60">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-ivory/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-forest-dark">#{enq.reference}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-charcoal">{enq.customerName}</div>
                    <div className="text-[10px] text-neutral-grey">{enq.email}</div>
                  </td>
                  <td className="py-3 px-4 text-charcoal font-medium">{enq.preferredDestinations}</td>
                  <td className="py-3 px-4">{enq.adultsCount} Adults</td>
                  <td className="py-3 px-4 font-medium text-forest">₹{Number(enq.budgetAmount || 0).toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeClass(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-grey">{formatDate(enq.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
