import React from 'react';
import { BookingRequest } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';
import { formatINR } from '../utils/pricing';
import { generateWhatsAppBookingUrl } from '../utils/booking';
import { X, Calendar, MapPin, Users, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRequest[];
  onBookNew: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onBookNew
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-bookings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div>
            <h2 id="my-bookings-title" className="text-lg font-bold text-white">
              My Booking History
            </h2>
            <p className="text-xs text-slate-400">Track status and contact Asif Enterprise</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Bookings Found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven&apos;t booked any workers yet. Book verified labours or carpenters now!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                Book Workers Now
              </button>
            </div>
          ) : (
            bookings.map((booking) => {
              const statusColors = {
                Confirmed: 'bg-blue-950/80 text-blue-400 border-blue-800',
                Assigned: 'bg-amber-950/80 text-amber-400 border-amber-800',
                'In Progress': 'bg-purple-950/80 text-purple-400 border-purple-800',
                Completed: 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
              };

              return (
                <div
                  key={booking.id}
                  className="bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 font-bold">
                        #{booking.id}
                      </span>
                      <h4 className="text-sm font-bold text-white">{booking.serviceName}</h4>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        statusColors[booking.status] || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 py-1">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>{booking.workersCount} Workers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{booking.workDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{booking.timeSlot}</span>
                    </div>
                    <div className="text-right sm:text-left font-bold text-amber-400">
                      {formatINR(booking.estimatedPrice)}
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{booking.siteLocation}</span>
                  </div>

                  {/* Actions for this booking */}
                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href={generateWhatsAppBookingUrl(booking)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Status</span>
                    </a>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Asif</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Helpline: <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold">{BUSINESS_INFO.displayPhone}</a>
          </p>
          <button
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors"
          >
            + Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
};
