import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export const OwnerLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAsOwner, setCurrentView } = useStore();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAsOwner(passcode);
    if (success) {
      setIsLoginModalOpen(false);
      setPasscode('');
      setErrorMsg('');
      setCurrentView('admin');
    } else {
      setErrorMsg('Incorrect passcode. Use default passcode: veora2026');
    }
  };

  const handleDemoUnlock = () => {
    loginAsOwner('veora2026');
    setIsLoginModalOpen(false);
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 sm:p-8 border border-[#E8E2D8] shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8] mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1C2E24]" />
            <h3 className="font-serif text-xl text-[#1C2E24]">Owner Atelier Login</h3>
          </div>
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setErrorMsg('');
            }}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <p className="text-stone-600 leading-relaxed">
            Enter the studio owner security passcode to manage inventory, edit product prices, and review custom commission requests.
          </p>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Owner Passcode</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
              />
            </div>
            {errorMsg && <p className="text-[#8C3A27] text-[11px] mt-1 font-medium">{errorMsg}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#1C2E24] text-[#E8DFC8] rounded-lg font-semibold uppercase tracking-wider hover:bg-[#253D30] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-3 border-t border-stone-100 text-center">
            <button
              type="button"
              onClick={handleDemoUnlock}
              className="text-[#7A6142] hover:underline font-medium text-[11px]"
            >
              Quick Preview Demo Access (veora2026) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
