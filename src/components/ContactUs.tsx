import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';

export default function ContactUs() {
  // Defaults
  let address = "Archana Castle, Ramapuram Road, Parangi Malai, St.Thomas Mount, Chennai, Tamil Nadu 600016";
  let phone = "+91 98765 43210";
  let email = "info@buddhaarivukalanjiyam.org";
  let hours = "Mon – Sat: 09:00 AM – 06:00 PM (IST)";
  let regNo = "Reg No. 412/IV/2022-DL";
  let latitude = "13.0042";
  let longitude = "80.1948";

  try {
    const admin = useAdmin();
    if (admin) {
      address = admin.contactAddress;
      phone = admin.contactPhone;
      email = admin.contactEmail;
      hours = admin.contactHours;
      regNo = admin.contactRegNo;
      latitude = admin.contactLatitude || "13.0042";
      longitude = admin.contactLongitude || "80.1948";
    }
  } catch (e) {
    // fallback
  }

  return (
    <section id="contact" className="py-24 bg-cream scroll-mt-24 border-t border-bronze/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Balanced Centered Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-bronze pb-1 border-b border-bronze/30 inline-block">
            Trust Headquarters Desk
          </span>
          <h2 className="font-display font-medium text-3.5xl sm:text-4xl text-charcoal leading-tight">
            Connect With Our Team
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Whether you wish to enrol a school, establish remote learning modules, inquire about local scholarships, or apply as a regional volunteer, we are here for you.
          </p>
        </div>

        {/* Balanced 2-Column Desktop Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Left Block: Communication & Details */}
          <div className="space-y-4">
            
            {/* Card Address */}
            <div className="p-5 rounded-2xl bg-white border border-bronze/10 flex gap-4 hover:border-bronze/30 hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-full bg-cream-dark/50 border border-bronze/15 flex items-center justify-center text-bronze shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1 w-full">
                <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider">Registered Trust Secretariat</h4>
                <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                  {address}
                </p>
              </div>
            </div>

            {/* Social Media Links Column */}
            <div className="p-5 rounded-2xl bg-white border border-bronze/10 space-y-3 hover:border-bronze/30 hover:shadow-xs transition-all">
              <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider">Connect via Social Channels</h4>
              <p className="text-[11px] text-muted">Stay updated with real-time field releases, student achievements, and trust reports.</p>
              <div className="flex items-center gap-3 pt-1">
                {[
                  { component: Facebook, link: "https://facebook.com" },
                  { component: Instagram, link: "https://instagram.com" },
                  { component: Linkedin, link: "https://linkedin.com" },
                  { component: Youtube, link: "https://youtube.com" }
                ].map((social, idx) => {
                  const Icon = social.component;
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-cream-dark/50 hover:bg-bronze hover:text-white transition-all text-bronze flex items-center justify-center shrink-0 border border-bronze/10"
                      title="Social channel link"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Card Communication */}
            <div className="p-5 rounded-2xl bg-white border border-bronze/10 flex gap-4 hover:border-bronze/30 hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-full bg-cream-dark/50 border border-bronze/15 flex items-center justify-center text-bronze shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider">Direct Trust Hotline & Email</h4>
                <p className="text-xs text-muted/95 font-semibold font-mono">{phone}</p>
                <p className="text-[11px] text-bronze font-mono hover:underline select-all">
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            {/* Card Hours */}
            <div className="p-5 rounded-2xl bg-white border border-bronze/10 flex gap-4 hover:border-bronze/30 hover:shadow-xs transition-all">
              <div className="w-10 h-10 rounded-full bg-cream-dark/50 border border-bronze/15 flex items-center justify-center text-bronze shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider">Office Hours</h4>
                <p className="text-xs text-muted leading-relaxed">
                  {hours}
                </p>
                <p className="text-[10px] text-muted">Closed on state gazetted trust holidays</p>
              </div>
            </div>

          </div>

          {/* Right Block: Regional Operations & Overview */}
          <div className="space-y-6">
            
            {/* Interactive Vector Operations Micro-Map */}
            <div className="p-6 rounded-2xl bg-white border border-bronze/12 space-y-4 hover:border-bronze/30 hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-xs border-b border-bronze/[0.08] pb-3">
                <span className="font-semibold text-charcoal">Registered Geolocation Base</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-bronze font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Live Administrative Grid
                </span>
              </div>
              
              <div className="relative h-56 w-full rounded-xl border border-bronze/10 overflow-hidden bg-cream-dark/30 shadow-inner">
                <iframe
                  title="Trust Secretariat Headquarters Interactive Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-90 hover:opacity-100"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <div className="space-y-0.5 text-left">
                  <span className="block text-[8px] font-mono text-muted uppercase tracking-wider">Primary Operations Coordinates</span>
                  <span className="block text-[10px] font-mono text-charcoal font-semibold">
                    Lat: {latitude} • Lng: {longitude}
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-bronze hover:bg-bronze-dark text-white rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                  title="Navigate with external application"
                >
                  <span>Open Navigation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Extra Trust Transparency block */}
            <div className="p-6 rounded-2xl bg-cream-dark/35 border border-bronze/8 space-y-3">
              <h4 className="font-sans font-bold text-xs text-charcoal uppercase tracking-wider">Operations & Outreach Transparency</h4>
              <p className="text-xs text-muted leading-relaxed">
                As a fully registered public charitable unit, we guarantee that all interactions, mentorship applications, and operational projects are subject to strict regulatory verification and annual public disclosure.
              </p>
              <div className="text-[10px] font-mono text-bronze-dark space-y-1">
                <p>• Secretariat registration: {regNo}</p>
                <p>• Official correspondence: {email}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
