import React, { useState, useMemo } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/servicesData';
import { DurationType } from '../types';
import { calculateEstimate, formatINR } from '../utils/pricing';
import { Calculator, Users, Clock, Wrench, Zap, ArrowRight, MessageSquare, Check, Sparkles } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/booking';

interface CostEstimatorProps {
  onProceedToBooking: (estimateData: {
    serviceId: string;
    workersCount: number;
    durationType: DurationType;
    daysCount: number;
    includeTools: boolean;
    isUrgent: boolean;
    estimatedPrice: number;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onProceedToBooking }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [workersCount, setWorkersCount] = useState<number>(2);
  const [durationType, setDurationType] = useState<DurationType>('full_day');
  const [daysCount, setDaysCount] = useState<number>(3);
  const [includeTools, setIncludeTools] = useState<boolean>(true);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const selectedService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  const calculation = useMemo(() => {
    return calculateEstimate({
      baseDailyPrice: selectedService.startingPrice,
      workersCount,
      durationType,
      daysCount: durationType === 'custom_days' ? daysCount : 1,
      includeTools,
      isUrgent
    });
  }, [selectedService, workersCount, durationType, daysCount, includeTools, isUrgent]);

  const handleBookNow = () => {
    onProceedToBooking({
      serviceId: selectedService.id,
      workersCount,
      durationType,
      daysCount: durationType === 'custom_days' ? daysCount : 1,
      includeTools,
      isUrgent,
      estimatedPrice: calculation.totalEstimatedPrice
    });
  };

  const whatsappInquiryUrl = useMemo(() => {
    const durationLabel =
      durationType === 'half_day'
        ? 'Half Day (4h)'
        : durationType === 'custom_days'
        ? `${daysCount} Days`
        : 'Full Day (8h)';

    const text = `Hi Asif Enterprise, I calculated an estimate on your website:
• Service: ${selectedService.name}
• Workers: ${workersCount}
• Duration: ${durationLabel}
• Estimated Total: ${formatINR(calculation.totalEstimatedPrice)}
Please confirm availability and booking.`;

    return generateDirectWhatsAppUrl(text);
  }, [selectedService, workersCount, durationType, daysCount, calculation]);

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <Calculator className="w-4 h-4" />
            <span>Instant Rate Calculator</span>
            <span className="text-slate-600">/</span>
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Estimate Your Work & Labour Cost Instantly
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            No guessing games, zero hidden agent fees. Calculate your exact workforce cost based on work type, team size, and duration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form Column */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            {/* 1. Select Service */}
            <div>
              <label htmlFor="service-select" className="block text-sm font-semibold text-slate-200 mb-2">
                1. Select Service / Trade
              </label>
              <select
                id="service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — from {formatINR(s.startingPrice)}/day
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-400">
                {selectedService.description}
              </p>
            </div>

            {/* 2. Number of Workers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>2. Number of Workers Needed</span>
                </label>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                  {workersCount} {workersCount === 1 ? 'Worker' : 'Workers'}
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[1, 2, 4, 6, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setWorkersCount(num)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      workersCount === num
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {num} {num === 1 ? 'Hand' : 'Hands'}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="1"
                max="25"
                value={workersCount}
                onChange={(e) => setWorkersCount(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
                aria-label="Workers count slider"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 Worker</span>
                <span>10 Workers (10% Bulk Discount)</span>
                <span>25 Workers</span>
              </div>
            </div>

            {/* 3. Duration Selector */}
            <div>
              <label className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>3. Shift Duration</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDurationType('half_day')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    durationType === 'half_day'
                      ? 'bg-slate-800 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">Half Day</p>
                  <p className="text-[11px] text-slate-400">4 Hours Shift</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationType('full_day')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    durationType === 'full_day'
                      ? 'bg-slate-800 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">Full Day</p>
                  <p className="text-[11px] text-slate-400">8 Hours Standard</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationType('custom_days')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    durationType === 'custom_days'
                      ? 'bg-slate-800 border-amber-400 text-white ring-1 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">Multi-Day</p>
                  <p className="text-[11px] text-slate-400">Project Contract</p>
                </button>
              </div>

              {durationType === 'custom_days' && (
                <div className="mt-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300 font-medium">Select Total Number of Days:</span>
                    <span className="text-xs font-bold text-amber-400">{daysCount} Days</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={daysCount}
                    onChange={(e) => setDaysCount(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 cursor-pointer"
                    aria-label="Number of days"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>2 Days</span>
                    <span>15 Days</span>
                    <span>30 Days (Monthly Contract)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Options / Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">Provide Professional Tool Kits</p>
                    <p className="text-[11px] text-slate-400">Power tools, cutters, drill bits, shovels & ropes</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeTools}
                  onChange={(e) => setIncludeTools(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">Express 2-Hour Dispatch</p>
                    <p className="text-[11px] text-slate-400">Priority arrival for urgent repair or loading</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Live Quote Breakdown Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">Estimated Quote</span>
                <h3 className="text-xl font-extrabold text-white">Cost Summary</h3>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-3 my-6 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Base Wage ({selectedService.name}):</span>
                <span className="font-semibold text-white">{formatINR(selectedService.startingPrice)} / day</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Workers Deployed:</span>
                <span className="font-semibold text-white">{workersCount} Workers</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Shift Duration:</span>
                <span className="font-semibold text-white">
                  {durationType === 'half_day' ? 'Half Day (4 hrs)' : durationType === 'custom_days' ? `${daysCount} Days` : 'Full Day (8 hrs)'}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">{formatINR(calculation.subtotal)}</span>
              </div>

              {calculation.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Bulk Discount ({calculation.discountPercentage}% off):</span>
                  <span>- {formatINR(calculation.discountAmount)}</span>
                </div>
              )}

              {calculation.toolsFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Equipment & Tool Supplies:</span>
                  <span className="font-semibold text-white">+{formatINR(calculation.toolsFee)}</span>
                </div>
              )}

              {calculation.urgentFee > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Express Dispatch Surge (15%):</span>
                  <span>+{formatINR(calculation.urgentFee)}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
              <span className="text-xs text-slate-400">Total Estimated Cost:</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                  {formatINR(calculation.totalEstimatedPrice)}
                </span>
                <span className="text-xs text-slate-400">
                  ≈ {formatINR(calculation.pricePerWorkerFinal)} / worker
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                *Final wage confirmed on arrival. No hidden contractor margins.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Book With This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Estimate to WhatsApp</span>
              </a>
            </div>

            <p className="mt-4 text-[11px] text-center text-slate-400">
              Need immediate clarification? Call proprietor Asif at{' '}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold underline">
                {BUSINESS_INFO.displayPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
