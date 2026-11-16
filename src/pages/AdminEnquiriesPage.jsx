import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, MessageSquare, Clock, Plus, 
  Send, CheckCircle, X, AlertCircle, RefreshCw, Phone, Mail 
} from 'lucide-react';
import adminService from '../services/adminService';
import { formatDate, formatCurrency, getStatusBadgeClass } from '../utils/formatters';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const STATUSES = [
  'ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP_REQUIRED', 
  'QUOTATION_PREPARATION', 'QUOTATION_SENT', 'CONFIRMED', 'CLOSED', 'CANCELLED'
];

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  
  // Note Form
  const [newNote, setNewNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Quotation Modal & Form
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quotationList, setQuotationList] = useState([]);
  const [quoteForm, setQuoteForm] = useState({
    amount: '',
    currency: 'INR',
    itinerarySummary: '',
    inclusions: 'Dedicated hill vehicle, verified boutique hotels, daily breakfast, permit coordination.',
    exclusions: 'Airfare to Guwahati/Bagdogra, personal shopping, safari entry camera fees.',
    validUntil: '',
  });

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedStatus !== 'ALL') params.status = selectedStatus;
      if (search) params.search = search;
      
      const res = await adminService.getEnquiries(params);
      setEnquiries(res?.content || res || []);
    } catch (err) {
      console.warn('Backend call failed, loading fallback enquiries:', err.message);
      // Fallback demo enquiries
      setEnquiries([
        {
          id: 1,
          reference: 'TMT-104928',
          customerName: 'Aditi Sharma',
          email: 'aditi.sharma@example.com',
          phone: '+91 98765 11223',
          startingCity: 'Bengaluru',
          preferredDestinations: 'Meghalaya',
          departureDate: '2026-11-15',
          returnDate: '2026-11-20',
          adultsCount: 2,
          childrenCount: 0,
          budgetAmount: 65000,
          currency: 'INR',
          hotelPreference: 'boutique_heritage',
          interests: 'Living Root Bridges, River Boating (Dawki), Local Organic Cuisine',
          specialRequests: 'Celebrating 5th anniversary. Quiet rooms preferred.',
          status: 'NEW',
          createdAt: new Date().toISOString(),
          notes: [
            { id: 101, note: 'Initial enquiry submitted via website wizard.', createdAt: new Date().toISOString() }
          ]
        },
        {
          id: 2,
          reference: 'TMT-104927',
          customerName: 'Vikram Mukherjee',
          email: 'vikram.m@example.com',
          phone: '+91 98200 44556',
          startingCity: 'Kolkata',
          preferredDestinations: 'Assam & Guwahati',
          departureDate: '2026-12-05',
          returnDate: '2026-12-11',
          adultsCount: 4,
          childrenCount: 1,
          budgetAmount: 140000,
          currency: 'INR',
          hotelPreference: 'luxury',
          interests: 'Wildlife & Rhino Safaris, Boutique Tea Estates',
          specialRequests: 'Need Jeep Safari slot booked for Bagori range.',
          status: 'FOLLOW_UP_REQUIRED',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          notes: [
            { id: 102, note: 'Called client, discussed 6-day Kaziranga & Shillong combo. Client to confirm dates.', createdAt: new Date().toISOString() }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [selectedStatus]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await adminService.updateEnquiryStatus(enquiryId, newStatus);
      // Update local state
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;
    setIsAddingNote(true);
    try {
      const notePayload = {
        note: newNote.trim(),
        followUpDate: followUpDate || null,
      };
      await adminService.addFollowUpNote(selectedEnquiry.id, notePayload);
      
      const updatedNotes = [
        ...(selectedEnquiry.notes || []),
        { id: Date.now(), note: newNote.trim(), createdAt: new Date().toISOString() }
      ];
      setSelectedEnquiry(prev => ({ ...prev, notes: updatedNotes }));
      setNewNote('');
      setFollowUpDate('');
    } catch (err) {
      alert('Failed to save follow-up note: ' + err.message);
    } finally {
      setIsAddingNote(false);
    }
  };

  const openEnquiryDetails = async (enquiry) => {
    setSelectedEnquiry(enquiry);
    try {
      const quotes = await adminService.getQuotations(enquiry.id);
      setQuotationList(quotes || []);
    } catch {
      setQuotationList([]);
    }
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry || !quoteForm.amount) return;
    try {
      const payload = {
        amount: Number(quoteForm.amount),
        currency: quoteForm.currency,
        itinerarySummary: quoteForm.itinerarySummary,
        inclusions: quoteForm.inclusions,
        exclusions: quoteForm.exclusions,
        validUntil: quoteForm.validUntil || null,
      };
      const created = await adminService.createQuotation(selectedEnquiry.id, payload);
      setQuotationList(prev => [...prev, created || { ...payload, id: Date.now(), createdAt: new Date().toISOString(), status: 'DRAFT' }]);
      setShowQuoteModal(false);
      handleStatusChange(selectedEnquiry.id, 'QUOTATION_PREPARATION');
    } catch (err) {
      alert('Failed to create quotation record: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest-dark">Enquiries & Leads</h1>
          <p className="text-xs text-neutral-grey mt-1">Review traveler requests, manage follow-up notes, and issue customized quotations.</p>
        </div>
        <button
          onClick={loadEnquiries}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-border text-xs font-semibold text-charcoal hover:bg-ivory shadow-soft"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-border shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-grey absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, or #reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadEnquiries()}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {STATUSES.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-forest text-gold border border-forest'
                  : 'bg-ivory text-charcoal hover:bg-neutral-border/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-neutral-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory text-neutral-grey uppercase tracking-wider font-semibold border-b border-neutral-border">
              <tr>
                <th className="py-3.5 px-4">Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Destinations</th>
                <th className="py-3.5 px-4">Dates</th>
                <th className="py-3.5 px-4">Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border/60">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-grey">
                    No travel enquiries match the selected filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-dark">#{enq.reference}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-charcoal">{enq.customerName}</div>
                      <div className="text-[10px] text-neutral-grey">{enq.startingCity || 'Starting city not given'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-charcoal">{enq.phone}</div>
                      <div className="text-[10px] text-neutral-grey">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-forest-dark">{enq.preferredDestinations}</td>
                    <td className="py-3.5 px-4 text-charcoal">
                      {enq.departureDate ? `${formatDate(enq.departureDate)}` : 'Flexible Dates'}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-forest">
                      ₹{Number(enq.budgetAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-[10px] font-bold rounded-lg px-2 py-1 border cursor-pointer ${getStatusBadgeClass(enq.status)}`}
                      >
                        {STATUSES.filter(s => s !== 'ALL').map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openEnquiryDetails(enq)}
                        className="p-1.5 rounded-lg text-forest hover:bg-forest/10 hover:text-forest-dark transition-colors"
                        title="View Full Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL / DRAWER */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark">Enquiry Inspection</span>
                  <h2 className="text-2xl font-serif font-bold text-forest-dark">
                    Ref #{selectedEnquiry.reference}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 text-neutral-grey hover:text-charcoal rounded-lg hover:bg-ivory"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Bar */}
              <div className="bg-ivory p-4 rounded-xl border border-neutral-border flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-neutral-grey uppercase block">Current Workflow Status</span>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={buildWhatsAppUrl(`Hello ${selectedEnquiry.customerName}, this is The Memorable Trip planning desk regarding your Northeast enquiry #${selectedEnquiry.reference}.`, selectedEnquiry.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59]"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-semibold hover:bg-forest-dark"
                  >
                    <Phone size={14} /> Call
                  </a>
                </div>
              </div>

              {/* Customer & Trip Details */}
              <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
                <div>
                  <span className="text-neutral-grey block">Customer Name</span>
                  <span className="font-semibold text-charcoal text-sm">{selectedEnquiry.customerName}</span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Email Address</span>
                  <span className="font-semibold text-charcoal text-sm">{selectedEnquiry.email}</span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Phone / WhatsApp</span>
                  <span className="font-semibold text-charcoal">{selectedEnquiry.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Starting City</span>
                  <span className="font-semibold text-charcoal">{selectedEnquiry.startingCity || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Destinations</span>
                  <span className="font-semibold text-forest-dark">{selectedEnquiry.preferredDestinations}</span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Dates</span>
                  <span className="font-semibold text-charcoal">
                    {selectedEnquiry.departureDate ? `${formatDate(selectedEnquiry.departureDate)} to ${formatDate(selectedEnquiry.returnDate)}` : 'Flexible'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Group Size</span>
                  <span className="font-semibold text-charcoal">
                    {selectedEnquiry.adultsCount} Adults {selectedEnquiry.childrenCount > 0 ? `, ${selectedEnquiry.childrenCount} Children` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-grey block">Budget</span>
                  <span className="font-semibold text-forest text-sm">
                    ₹{Number(selectedEnquiry.budgetAmount || 0).toLocaleString('en-IN')} ({selectedEnquiry.budgetBasis || 'per person'})
                  </span>
                </div>
              </div>

              {/* Hotel Preference & Interests */}
              <div className="bg-ivory/50 p-4 rounded-xl border border-neutral-border/60 mt-4 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-forest-dark block">Hotel Style:</span>
                  <span className="text-charcoal">{selectedEnquiry.hotelPreference || 'Standard'}</span>
                </div>
                <div>
                  <span className="font-semibold text-forest-dark block">Travel Interests:</span>
                  <span className="text-charcoal">{selectedEnquiry.interests || 'None specified'}</span>
                </div>
                {selectedEnquiry.specialRequests && (
                  <div>
                    <span className="font-semibold text-forest-dark block">Special Requests:</span>
                    <span className="text-charcoal italic">{selectedEnquiry.specialRequests}</span>
                  </div>
                )}
              </div>

              {/* Quotations Section */}
              <div className="mt-6 pt-4 border-t border-neutral-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-serif font-bold text-forest-dark">Quotations Issued</h3>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-gold"
                  >
                    <Plus size={14} /> Add Quotation Record
                  </button>
                </div>

                {quotationList.length === 0 ? (
                  <p className="text-xs text-neutral-grey italic">No quotations issued yet for this enquiry.</p>
                ) : (
                  <div className="space-y-2">
                    {quotationList.map((q, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-neutral-border bg-white text-xs space-y-1">
                        <div className="flex justify-between font-bold text-forest-dark">
                          <span>Quote #{q.id || idx + 1}</span>
                          <span className="text-forest">₹{Number(q.amount).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-charcoal/80 text-[11px]">{q.itinerarySummary || 'Custom Itinerary Package'}</p>
                        {q.validUntil && (
                          <p className="text-[10px] text-neutral-grey">Valid until: {formatDate(q.validUntil)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Follow-Up Internal Notes */}
              <div className="mt-6 pt-4 border-t border-neutral-border">
                <h3 className="text-sm font-serif font-bold text-forest-dark mb-3">Follow-Up & Audit Notes</h3>
                
                {/* Notes History */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-4">
                  {(selectedEnquiry.notes || []).length === 0 ? (
                    <p className="text-xs text-neutral-grey italic">No notes recorded yet.</p>
                  ) : (
                    selectedEnquiry.notes.map((n, idx) => (
                      <div key={idx} className="p-3 bg-ivory rounded-xl border border-neutral-border text-xs">
                        <p className="text-charcoal">{n.note}</p>
                        <span className="text-[10px] text-neutral-grey block mt-1">{formatDate(n.createdAt)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter staff follow-up note (e.g. called client, discussed dates)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      title="Next follow up reminder date"
                      className="text-xs p-2 rounded-xl border border-neutral-border"
                    />
                    <button
                      type="submit"
                      disabled={isAddingNote}
                      className="flex-1 py-2 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark disabled:opacity-50"
                    >
                      {isAddingNote ? 'Saving...' : 'Add Internal Note'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-border">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-full py-2.5 rounded-xl border border-neutral-border text-charcoal text-xs font-semibold hover:bg-ivory"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE QUOTATION MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-neutral-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-border">
              <h3 className="text-xl font-serif font-bold text-forest-dark">Create Quotation Record</h3>
              <button onClick={() => setShowQuoteModal(false)} className="text-neutral-grey hover:text-charcoal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Quotation Amount (INR) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 75000"
                  value={quoteForm.amount}
                  onChange={(e) => setQuoteForm({ ...quoteForm, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Itinerary / Package Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6D/5N Meghalaya & Kaziranga Custom Journey"
                  value={quoteForm.itinerarySummary}
                  onChange={(e) => setQuoteForm({ ...quoteForm, itinerarySummary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Inclusions</label>
                <textarea
                  rows={2}
                  value={quoteForm.inclusions}
                  onChange={(e) => setQuoteForm({ ...quoteForm, inclusions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Exclusions</label>
                <textarea
                  rows={2}
                  value={quoteForm.exclusions}
                  onChange={(e) => setQuoteForm({ ...quoteForm, exclusions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Valid Until Date</label>
                <input
                  type="date"
                  value={quoteForm.validUntil}
                  onChange={(e) => setQuoteForm({ ...quoteForm, validUntil: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-neutral-border text-charcoal font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-ivory font-semibold shadow-md"
                >
                  Save Quotation Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;
