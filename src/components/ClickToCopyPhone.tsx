import React, { useState } from 'react';
import { Copy, Check, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface ClickToCopyPhoneProps {
  className?: string;
  phoneNumber?: string;
  displayNumber?: string;
  variant?: 'card' | 'inline' | 'compact';
}

export const ClickToCopyPhone: React.FC<ClickToCopyPhoneProps> = ({
  className = '',
  phoneNumber = BUSINESS_INFO.phone,
  displayNumber = BUSINESS_INFO.displayPhone,
  variant = 'card'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phoneNumber);
        success = true;
      }
    } catch {
      // Fallback for strict browser permissions / headless environments
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.warn('Clipboard copy fallback:', fallbackErr);
      }
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <a
          href={`tel:${phoneNumber}`}
          className="text-amber-400 font-bold hover:underline"
          title="Tap to call directly"
        >
          {displayNumber}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={`p-1 rounded transition-colors cursor-pointer text-xs flex items-center gap-1 ${
            copied
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
              : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700'
          }`}
          aria-label={copied ? 'Copied to clipboard' : 'Click to copy phone number'}
          title={copied ? 'Copied!' : 'Click to copy number'}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[10px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={`tel:${phoneNumber}`}
          className="text-base sm:text-lg font-extrabold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
          title="Tap to dial"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>{displayNumber}</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
            copied
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
          }`}
          aria-label={copied ? 'Phone number copied' : 'Click to copy phone number'}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-white" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-amber-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Variant: 'card' (Featured in Contact & Footer blocks)
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center gap-2.5 text-white hover:text-amber-400 transition-colors group flex-1"
        title="Tap to dial directly"
      >
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
          <Phone className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 font-medium block">Tap to Call:</span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400">
            {displayNumber}
          </span>
        </div>
      </a>

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 border ${
          copied
            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
        }`}
        aria-label={copied ? 'Copied phone number to clipboard' : 'Click to copy phone number'}
        title="Copy phone number to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>Click to Copy</span>
          </>
        )}
      </button>
    </div>
  );
};
