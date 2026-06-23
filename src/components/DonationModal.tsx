import React, { useState } from 'react';
import { X, Heart, CreditCard, Check, Sparkles, Shield, Gift, ArrowRight } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [
  { value: 1000, label: "₹1,000", impact: "Sponsors a student's books for a year." },
  { value: 2500, label: "₹2,500", impact: "Provides high-speed digital learning access." },
  { value: 5000, label: "₹5,000", impact: "Funds dynamic teacher training training modules." },
  { value: 10000, label: "₹10,000", impact: "Rebuilds a rural classroom facility." }
];

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState("Scholarship Fund");
  const [errorText, setErrorText] = useState("");
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Payment simulated details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!isOpen) return null;

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmount("");
    setErrorText("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorText("");
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setAmount(num);
    } else {
      setAmount(0);
    }
  };

  const currentImpact = PRESET_AMOUNTS.find(p => p.value === amount)?.impact || "Supports our core educational operations.";

  const nextStep = () => {
    setErrorText("");
    if (step === 1) {
      if (amount <= 0) {
        setErrorText("Please specify a valid donation amount.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name.trim() || !email.trim()) {
        setErrorText("Please fill out your name and email.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4); // Success!
    }
  };

  const prevStep = () => {
    setErrorText("");
    if (step > 1) setStep(step - 1);
  };

  const resetAndClose = () => {
    setStep(1);
    setAmount(2500);
    setCustomAmount("");
    setName("");
    setEmail("");
    setPhone("");
    setIsAnonymous(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setErrorText("");
    onClose();
  };

  return (
    <div id="donation-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-md animate-fade-in">
      <div id="donation-card" className="w-full max-w-lg overflow-hidden rounded-2xl glass-panel shadow-2xl relative border border-white/50 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-bronze/10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-bronze fill-bronze/20 animate-pulse" />
            <h3 className="font-display font-medium text-lg text-charcoal">
              Be the Light: Donate Support
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-full text-muted hover:bg-bronze/10 hover:text-bronze transition-colors"
            title="Close donation form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="px-6 py-2 bg-cream-dark/60 flex items-center justify-between text-xs font-mono text-muted">
          <span className={step === 1 ? 'text-bronze font-bold' : ''}>1. Amount</span>
          <span className="text-bronze/40">/</span>
          <span className={step === 2 ? 'text-bronze font-bold' : ''}>2. Details</span>
          <span className="text-bronze/40">/</span>
          <span className={step === 3 ? 'text-bronze font-bold' : ''}>3. Payment</span>
          <span className="text-bronze/40">/</span>
          <span className={step === 4 ? 'text-bronze font-bold' : ''}>4. Complete</span>
        </div>

        {/* Dialog Content Area Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorText && (
            <div className="mb-4 p-3.5 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 animate-fade-in flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorText}</span>
            </div>
          )}
          {step === 1 && (
            <div id="modal-step-1" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">Choose educational cause:</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Scholarship Fund", "Digital Classrooms", "Teacher Training", "General Development"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCause(c)}
                      className={`py-2 px-3 text-sm rounded-lg border text-left transition-all ${
                        cause === c
                          ? 'border-bronze bg-bronze/10 text-bronze font-medium'
                          : 'border-bronze/25 text-muted hover:bg-cream-dark/30'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">Select Donation Amount (INR):</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_AMOUNTS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => handlePresetSelect(p.value)}
                      className={`py-3 text-center rounded-xl border font-bold text-sm transition-all ${
                        amount === p.value && !customAmount
                          ? 'bg-bronze text-white border-bronze shadow-md'
                          : 'bg-white border-bronze/20 text-charcoal hover:bg-cream'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount */}
                <div className="mt-3 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="Enter Custom Amount"
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-bronze/30 bg-white/55 text-sm font-bold text-charcoal focus:outline-none focus:border-bronze"
                  />
                </div>
              </div>

              {/* Dynamic Impact Display Box */}
              <div className="p-4 rounded-xl bg-bronze/5 border border-bronze/10 flex gap-3 items-start">
                <Gift className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-bronze">Impact of your gift:</h4>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{currentImpact}</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div id="modal-step-2" className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5Packed">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-3 py-2 border border-bronze/20 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5 opacity-90">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full px-3 py-2 border border-bronze/20 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-bronze/20 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="anonymous-checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-bronze focus:ring-bronze accent-bronze w-4 h-4"
                />
                <label htmlFor="anonymous-checkbox" className="text-sm text-muted cursor-pointer select-none">
                  Make my donation anonymous on the live public roster
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div id="modal-step-3" className="space-y-5">
              <div className="p-3 bg-bronze/5 border border-bronze/10 rounded-xl flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted">Total Contribution:</span>
                  <p className="font-bold text-bronze text-lg">₹{amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-muted text-xs block">Cause:</span>
                  <span className="font-medium font-mono text-xs">{cause}</span>
                </div>
              </div>

              {/* Simulated Card form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    defaultValue={isAnonymous ? "Benefactor" : name}
                    placeholder="Owner's Name"
                    className="w-full px-3 py-2 border border-bronze/25 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      className="w-full pl-3 pr-10 py-2 border border-bronze/25 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 border border-bronze/25 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">CVV Code</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-3 py-2 border border-bronze/25 bg-white/70 rounded-xl focus:outline-none focus:border-bronze text-sm text-charcoal text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted/80 bg-cream/80 p-2.5 rounded-lg">
                <Shield className="w-4 h-4 text-green-600 shrink-0" />
                <span>Simulated Secure 256-bit SSL transaction for testing purposes. No real money is processed.</span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div id="modal-step-4" className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-medium text-2xl text-charcoal">
                  Thank You, {isAnonymous ? "Generous Benefactor" : name}!
                </h4>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Your heartfelt donation of <span className="font-bold text-bronze">₹{amount.toLocaleString()}</span> has been simulated securely! You are helping us keep the lamp of wisdom glowing for students under the <span className="font-semibold text-charcoal">Buddha Arivu Kalanjiyam</span>.
                </p>
              </div>

              <div className="p-4 bg-cream border border-bronze/20 rounded-xl max-w-xs mx-auto text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Cause:</span>
                  <span className="font-bold text-charcoal">{cause}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Transaction ID:</span>
                  <span className="font-mono text-bronze">BAK-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Status:</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider">Simulated Success</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="py-2.5 px-6 rounded-full bg-bronze text-white text-sm font-semibold hover:bg-bronze-dark transition-all shadow-md"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="p-6 border-t border-bronze/10 bg-cream/50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-4 rounded-full text-sm font-semibold border border-bronze/20 text-muted hover:bg-cream-dark transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={nextStep}
              className="py-2.5 px-6 rounded-full bg-bronze text-white text-sm font-semibold hover:bg-bronze-dark transition-colors flex items-center gap-1.5 shadow-md"
            >
              <span>{step === 3 ? "Simulate Payment" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
