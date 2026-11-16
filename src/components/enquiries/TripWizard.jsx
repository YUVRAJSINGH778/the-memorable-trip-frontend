import React, { useState } from 'react';
import { 
  Compass, Calendar, Users, DollarSign, Sliders, Send, 
  CheckCircle, ArrowRight, ArrowLeft, AlertCircle, Phone, MessageSquare, Mail 
} from 'lucide-react';
import enquiryService from '../../services/enquiryService';
import { buildWhatsAppUrl, getEnquirySuccessMessage } from '../../utils/whatsapp';

const INITIAL_FORM_DATA = {
  destinations: [],
  otherDestination: '',
  startingCity: '',
  dateFlexibility: 'fixed', // 'fixed', 'flexible_month', 'anytime'
  departureDate: '',
  returnDate: '',
  approximateMonth: '',
  adultsCount: 2,
  childrenCount: 0,
  childrenAges: '',
  budgetAmount: 50000,
  currency: 'INR',
  budgetBasis: 'per_person', // 'per_person' or 'total'
  budgetFlexibility: 'moderate', // 'strict', 'moderate', 'flexible'
  hotelPreference: 'boutique_heritage', // 'luxury', 'boutique_heritage', 'comfort_standard', 'homestays'
  travelInterests: [],
  specialRequests: '',
  customerName: '',
  email: '',
  phone: '',
  preferredContactMethod: 'WHATSAPP', // 'WHATSAPP', 'CALL', 'EMAIL'
  consentAgreed: false,
};

const DESTINATION_OPTIONS = [
  { id: 'meghalaya', label: 'Meghalaya (Waterfalls, Caves & Living Roots)' },
  { id: 'assam', label: 'Assam & Guwahati (Kaziranga Wildlife & Brahmaputra)' },
  { id: 'sikkim', label: 'Sikkim (Himalayan Peaks, Monasteries & High Lakes)' },
  { id: 'arunachal', label: 'Arunachal Pradesh (Tawang & Valleys)' },
  { id: 'other', label: 'Other Northeast Exploration' },
];

const INTEREST_OPTIONS = [
  'Waterfall Trails', 'Wildlife & Rhino Safaris', 'Living Root Bridges',
  'Monasteries & Culture', 'Scenic Treks', 'Boutique Tea Estates',
  'River Boating (Dawki)', 'Honeymoon & Romantic Retreat', 'Local Organic Cuisine', 'Slow Travel'
];

export const TripWizard = ({ initialDestination = '' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
    destinations: initialDestination ? [initialDestination] : [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const arr = prev[field] || [];
      const updated = arr.includes(item)
        ? arr.filter(i => i !== item)
        : [...arr, item];
      return { ...prev, [field]: updated };
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.destinations || formData.destinations.length === 0) {
        errs.destinations = 'Please select at least one preferred destination.';
      }
      if (!formData.startingCity || formData.startingCity.trim().length < 2) {
        errs.startingCity = 'Please enter your starting city or airport (e.g. Guwahati, Bagdogra, Delhi, Mumbai).';
      }
    } else if (currentStep === 2) {
      if (formData.dateFlexibility === 'fixed') {
        if (!formData.departureDate) {
          errs.departureDate = 'Please select your estimated departure date.';
        }
        if (!formData.returnDate) {
          errs.returnDate = 'Please select your estimated return date.';
        }
        if (formData.departureDate && formData.returnDate && new Date(formData.departureDate) > new Date(formData.returnDate)) {
          errs.returnDate = 'Return date cannot be earlier than departure date.';
        }
      }
    } else if (currentStep === 3) {
      if (!formData.adultsCount || formData.adultsCount < 1) {
        errs.adultsCount = 'At least 1 adult traveller is required.';
      }
    } else if (currentStep === 4) {
      if (!formData.budgetAmount || formData.budgetAmount <= 0) {
        errs.budgetAmount = 'Please provide an approximate realistic budget.';
      }
    } else if (currentStep === 5) {
      if (!formData.travelInterests || formData.travelInterests.length === 0) {
        errs.travelInterests = 'Please pick at least one interest to help us customize your itinerary.';
      }
    } else if (currentStep === 6) {
      if (!formData.customerName || formData.customerName.trim().length < 2) {
        errs.customerName = 'Please enter your full name.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        errs.email = 'Please provide a valid email address.';
      }
      const phoneDigits = (formData.phone || '').replace(/[^0-9]/g, '');
      if (!formData.phone || phoneDigits.length < 8) {
        errs.phone = 'Please provide a valid phone number (at least 8-10 digits).';
      }
      if (!formData.consentAgreed) {
        errs.consentAgreed = 'Please confirm consent to be contacted regarding this travel enquiry.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        startingCity: formData.startingCity.trim(),
        preferredDestinations: formData.destinations.join(', ') + (formData.otherDestination ? ` (${formData.otherDestination})` : ''),
        departureDate: formData.departureDate || null,
        returnDate: formData.returnDate || null,
        dateFlexibility: formData.dateFlexibility,
        adultsCount: Number(formData.adultsCount),
        childrenCount: Number(formData.childrenCount || 0),
        childrenAges: formData.childrenAges,
        budgetAmount: Number(formData.budgetAmount),
        currency: formData.currency,
        budgetBasis: formData.budgetBasis,
        budgetFlexibility: formData.budgetFlexibility,
        hotelPreference: formData.hotelPreference,
        interests: formData.travelInterests.join(', '),
        specialRequests: formData.specialRequests,
        preferredContactMethod: formData.preferredContactMethod,
        enquirySource: 'WEBSITE_WIZARD',
      };

      const result = await enquiryService.submitEnquiry(payload);
      setSubmissionResult(result);
    } catch (err) {
      setErrors({ form: err.message || 'Unable to submit your enquiry. Please check the details and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Success screen if submitted
  if (submissionResult) {
    const reference = submissionResult.reference || 'TMT-NEW';
    const whatsappUrl = buildWhatsAppUrl(
      getEnquirySuccessMessage(reference, formData.destinations.join(', '), formData.customerName)
    );

    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-elevated border border-gold/30 text-center max-w-2xl mx-auto animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark mb-2">
          Your Journey Plan Is In Motion!
        </h2>
        <p className="text-charcoal/80 mb-6">
          Thank you, <strong className="text-forest-dark">{formData.customerName}</strong>. Our Northeast travel planning specialist has received your requirements and is curating a personalized itinerary proposal for you.
        </p>

        <div className="bg-ivory rounded-xl p-5 border border-neutral-border mb-8 inline-block w-full text-left">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-border">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-grey">Enquiry Reference</span>
            <span className="font-mono font-bold text-forest-dark bg-gold/20 px-3 py-1 rounded-md text-sm">
              #{reference}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 text-sm">
            <div>
              <span className="text-xs text-neutral-grey block">Destinations</span>
              <span className="font-medium text-forest-dark">{formData.destinations.join(', ')}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-grey block">Travellers</span>
              <span className="font-medium text-forest-dark">{formData.adultsCount} Adults {formData.childrenCount > 0 ? `, ${formData.childrenCount} Children` : ''}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Fast-Track CTA */}
        <div className="space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-base shadow-lg transition-transform hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5 fill-white stroke-none" />
            <span>Fast-Track on WhatsApp With Reference #{reference}</span>
          </a>

          <p className="text-xs text-neutral-grey">
            A confirmation has also been directed to your email address: <strong>{formData.email}</strong>. Our team will reach out within 24 business hours.
          </p>
        </div>
      </div>
    );
  }

  // Steps Progress Indicator
  const stepTitles = ['Destination', 'Dates', 'Travellers', 'Budget', 'Preferences', 'Contact'];

  return (
    <div className="bg-white rounded-2xl shadow-elevated border border-neutral-border/80 overflow-hidden max-w-3xl mx-auto">
      {/* Header & Steps Tracker */}
      <div className="bg-forest-dark p-6 text-ivory">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">Custom Trip Planner</span>
          <span className="text-xs text-ivory/60">Step {step} of 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-ivory">
          {step === 1 && "Where would you like to wander?"}
          {step === 2 && "When are you planning to travel?"}
          {step === 3 && "Who is travelling with you?"}
          {step === 4 && "What is your approximate budget?"}
          {step === 5 && "What experiences speak to you?"}
          {step === 6 && "How can our specialist reach you?"}
        </h2>

        {/* Step dots */}
        <div className="grid grid-cols-6 gap-2 mt-6">
          {stepTitles.map((title, idx) => (
            <div key={title} className="flex flex-col items-center">
              <div
                className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                  idx + 1 <= step ? 'bg-gold' : 'bg-forest-light/60'
                }`}
              />
              <span className={`text-[10px] mt-1.5 hidden sm:block ${
                idx + 1 === step ? 'text-gold font-semibold' : 'text-ivory/40'
              }`}>
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8">
        {errors.form && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* STEP 1: DESTINATIONS */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-3">
                Select your preferred Northeast destinations <span className="text-gold">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DESTINATION_OPTIONS.map((dest) => {
                  const isChecked = formData.destinations.includes(dest.id);
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => toggleArrayItem('destinations', dest.id)}
                      className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        isChecked
                          ? 'border-forest bg-forest/5 text-forest-dark ring-2 ring-forest/20'
                          : 'border-neutral-border hover:border-gold/60 text-charcoal'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{dest.label}</span>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                          isChecked ? 'bg-forest text-ivory border-forest' : 'border-neutral-border'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.destinations && (
                <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.destinations}
                </p>
              )}
            </div>

            {formData.destinations.includes('other') && (
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Specify other destinations or specific towns
                </label>
                <input
                  type="text"
                  placeholder="e.g. Majuli, Ziro, Cherrapunji remote villages"
                  value={formData.otherDestination}
                  onChange={(e) => updateField('otherDestination', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Your Starting City or Entry Airport <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Guwahati (GAU), Bagdogra (IXB), Kolkata, Mumbai, Bangalore"
                value={formData.startingCity}
                onChange={(e) => updateField('startingCity', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none text-sm"
              />
              {errors.startingCity && (
                <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.startingCity}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: TRAVEL DATES */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Date Flexibility
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'fixed', label: 'Fixed Dates' },
                  { id: 'flexible_month', label: 'Flexible in Month' },
                  { id: 'anytime', label: 'Open / Exploring' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField('dateFlexibility', opt.id)}
                    className={`py-3 px-3 text-xs sm:text-sm font-medium rounded-xl border text-center transition-all ${
                      formData.dateFlexibility === opt.id
                        ? 'bg-forest text-ivory border-forest'
                        : 'border-neutral-border text-charcoal hover:border-gold'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.dateFlexibility === 'fixed' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Estimated Departure Date <span className="text-gold">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => updateField('departureDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none text-sm"
                  />
                  {errors.departureDate && (
                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.departureDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Estimated Return Date <span className="text-gold">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => updateField('returnDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none text-sm"
                  />
                  {errors.returnDate && (
                    <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.returnDate}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Target Travel Month & Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. November 2026 or Spring 2027"
                  value={formData.approximateMonth}
                  onChange={(e) => updateField('approximateMonth', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-border focus:ring-2 focus:ring-forest focus:outline-none text-sm"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3: TRAVELLERS */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-neutral-border bg-ivory/50">
                <label className="block text-sm font-semibold text-charcoal mb-1">
                  Adults (Ages 12+) <span className="text-gold">*</span>
                </label>
                <p className="text-xs text-neutral-grey mb-3">Primary travellers</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateField('adultsCount', Math.max(1, formData.adultsCount - 1))}
                    className="w-10 h-10 rounded-lg border border-neutral-border bg-white text-forest font-bold hover:bg-forest hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-lg text-forest-dark w-10 text-center">
                    {formData.adultsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateField('adultsCount', formData.adultsCount + 1)}
                    className="w-10 h-10 rounded-lg border border-neutral-border bg-white text-forest font-bold hover:bg-forest hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                {errors.adultsCount && (
                  <p className="text-rose-600 text-xs mt-1.5">{errors.adultsCount}</p>
                )}
              </div>

              <div className="p-4 rounded-xl border border-neutral-border bg-ivory/50">
                <label className="block text-sm font-semibold text-charcoal mb-1">
                  Children (Under 12)
                </label>
                <p className="text-xs text-neutral-grey mb-3">Helps determine vehicle & extra beds</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateField('childrenCount', Math.max(0, formData.childrenCount - 1))}
                    className="w-10 h-10 rounded-lg border border-neutral-border bg-white text-forest font-bold hover:bg-forest hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-lg text-forest-dark w-10 text-center">
                    {formData.childrenCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateField('childrenCount', formData.childrenCount + 1)}
                    className="w-10 h-10 rounded-lg border border-neutral-border bg-white text-forest font-bold hover:bg-forest hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {formData.childrenCount > 0 && (
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Ages of children (Optional, e.g. 5, 8)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6 and 9 years old"
                  value={formData.childrenAges}
                  onChange={(e) => updateField('childrenAges', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-charcoal">
                  Approximate Budget (INR) <span className="text-gold">*</span>
                </label>
                <span className="text-base font-bold text-forest">
                  ₹{Number(formData.budgetAmount).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={formData.budgetAmount}
                onChange={(e) => updateField('budgetAmount', Number(e.target.value))}
                className="w-full accent-forest h-2 bg-ivory-dark rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-grey mt-1">
                <span>₹20,000</span>
                <span>₹1,00,000</span>
                <span>₹2,50,000+</span>
              </div>
              {errors.budgetAmount && (
                <p className="text-rose-600 text-xs mt-1.5">{errors.budgetAmount}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Budget Basis</label>
                <select
                  value={formData.budgetBasis}
                  onChange={(e) => updateField('budgetBasis', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-border text-sm bg-white"
                >
                  <option value="per_person">Per Person</option>
                  <option value="total">Total for Entire Group</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Budget Flexibility</label>
                <select
                  value={formData.budgetFlexibility}
                  onChange={(e) => updateField('budgetFlexibility', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-border text-sm bg-white"
                >
                  <option value="moderate">Moderate Flexibility</option>
                  <option value="strict">Strict Budget</option>
                  <option value="flexible">Flexible for Premium Upgrades</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PREFERENCES */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Hotel & Accommodation Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'luxury', label: 'Luxury & Tea Bungalows' },
                  { id: 'boutique_heritage', label: 'Boutique & Heritage' },
                  { id: 'comfort_standard', label: 'Comfort Standard 3-Star' },
                  { id: 'homestays', label: 'Authentic Homestays' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField('hotelPreference', opt.id)}
                    className={`p-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      formData.hotelPreference === opt.id
                        ? 'bg-forest text-ivory border-forest'
                        : 'border-neutral-border text-charcoal hover:border-gold'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Travel Interests <span className="text-gold">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => {
                  const selected = formData.travelInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem('travelInterests', interest)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selected
                          ? 'bg-forest text-ivory shadow-sm'
                          : 'bg-ivory text-charcoal border border-neutral-border hover:border-gold'
                      }`}
                    >
                      {interest} {selected ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
              {errors.travelInterests && (
                <p className="text-rose-600 text-xs mt-1.5">{errors.travelInterests}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Special Requests or Pacing Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Prefer relaxed pace without long daily drives, vegetarian food only, celebrating 5th wedding anniversary."
                value={formData.specialRequests}
                onChange={(e) => updateField('specialRequests', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 6: CONTACT & SUBMISSION */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Full Name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ananya Sharma"
                value={formData.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
              />
              {errors.customerName && (
                <p className="text-rose-600 text-xs mt-1">{errors.customerName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Email Address <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                />
                {errors.email && (
                  <p className="text-rose-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Phone / WhatsApp Number <span className="text-gold">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-2">
                Preferred Mode of Contact
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'CALL', label: 'Phone Call', icon: Phone },
                  { id: 'EMAIL', label: 'Email', icon: Mail },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateField('preferredContactMethod', item.id)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                        formData.preferredContactMethod === item.id
                          ? 'bg-forest text-ivory border-forest'
                          : 'border-neutral-border text-charcoal hover:border-gold'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAgreed}
                  onChange={(e) => updateField('consentAgreed', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-forest focus:ring-forest accent-forest"
                />
                <span className="text-xs text-charcoal/80 leading-relaxed">
                  I agree to allow The Memorable Trip to review my travel preferences and contact me regarding this customized quotation request in accordance with the Privacy Policy.
                </span>
              </label>
              {errors.consentAgreed && (
                <p className="text-rose-600 text-xs mt-1.5">{errors.consentAgreed}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-border mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-border text-charcoal hover:bg-ivory text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-ivory text-sm font-semibold shadow-md transition-all hover:scale-105"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-accent hover:from-gold-dark hover:to-gold text-forest-dark text-sm font-bold shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Your Enquiry...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Custom Trip Enquiry</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripWizard;
