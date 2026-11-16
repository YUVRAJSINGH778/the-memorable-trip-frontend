import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center text-forest mx-auto">
        <Compass size={32} />
      </div>
      <h1 className="text-4xl font-serif font-bold text-forest-dark">404 — Path Not Found</h1>
      <p className="text-sm text-charcoal/70 leading-relaxed">
        The destination or page you were looking for seems to have wandered off the trail.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-forest-dark transition-colors"
        >
          <ArrowLeft size={16} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
