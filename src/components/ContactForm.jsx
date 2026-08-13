import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon } from '@hugeicons/core-free-icons';

export default function ContactForm() {
  const { lang } = useApp();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    setSendError(false);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: "Portfolio Visitor",
          subject: `New Message from ${formState.name}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSendError(true);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[var(--color-paper-2)] border-b-[3px] border-[var(--color-rule)]">
      
      {/* S1 Left Margin Numbered */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-b-[3px] border-[var(--color-rule)]">
        <div className="lg:w-1/4 p-6 lg:p-12 lg:border-r-[3px] border-[var(--color-rule)] flex items-start">
          <span className="font-mono text-2xl font-black text-[var(--color-ink)]">04 /</span>
        </div>
        <div className="lg:w-3/4 p-6 lg:p-12">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-[var(--color-ink)] mb-6">
            {lang === 'vi' ? 'Liên hệ' : 'Contact'}
          </h2>
          <p className="font-mono text-lg max-w-2xl text-[var(--color-ink-2)]">
            {lang === 'vi' ? 'Để lại lời nhắn. Tôi sẽ phản hồi trong 24h.' : 'Drop a message. I will reply within 24h.'}
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        
        {/* Left Col: Direct contact info */}
        <div className="lg:w-1/4 p-6 lg:p-8 xl:p-12 lg:border-r-[3px] border-[var(--color-rule)] border-b-[3px] lg:border-b-0 flex flex-col gap-8">
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[var(--color-ink-3)] mb-2">Email</h3>
            <a href={`mailto:${portfolioData.profile.email}`} className="font-display text-sm sm:text-base lg:text-sm xl:text-base font-bold text-[var(--color-ink)] hover:text-[var(--color-accent)] underline decoration-2 underline-offset-4 whitespace-nowrap tracking-tight block">
              {portfolioData.profile.email}
            </a>
          </div>
          {portfolioData.profile.phone && (
            <div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[var(--color-ink-3)] mb-2">Phone</h3>
              <a href={`tel:${portfolioData.profile.phone}`} className="font-display text-base xl:text-lg font-bold text-[var(--color-ink)] hover:text-[var(--color-accent)] underline decoration-2 underline-offset-4 whitespace-nowrap block">
                {portfolioData.profile.phone}
              </a>
            </div>
          )}
        </div>

        {/* Right Col: Form */}
        <div className="lg:w-3/4 p-6 lg:p-12">
          {submitted ? (
            <div className="brutal-border p-12 bg-[var(--color-paper)] flex flex-col items-center justify-center text-center min-h-[400px]">
              <HugeiconsIcon icon={SentIcon} className="w-16 h-16 text-[var(--color-accent)] mb-6" />
              <h3 className="font-display text-4xl font-extrabold uppercase text-[var(--color-ink)] mb-4">
                {lang === 'vi' ? 'Đã Gửi Thành Công' : 'Message Sent'}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="form-name" className="block font-mono text-sm font-bold uppercase text-[var(--color-ink)] mb-2">
                    {lang === 'vi' ? 'Tên của bạn' : 'Your Name'}
                  </label>
                  <input id="form-name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="input-brutal" />
                </div>
                <div>
                  <label htmlFor="form-email" className="block font-mono text-sm font-bold uppercase text-[var(--color-ink)] mb-2">
                    {lang === 'vi' ? 'Địa chỉ Email' : 'Email Address'}
                  </label>
                  <input id="form-email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="input-brutal" />
                </div>
              </div>
              
              <div>
                <label htmlFor="form-message" className="block font-mono text-sm font-bold uppercase text-[var(--color-ink)] mb-2">
                  {lang === 'vi' ? 'Lời nhắn' : 'Message'}
                </label>
                <textarea id="form-message" required rows="5" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="input-brutal resize-none"></textarea>
              </div>

              {sendError && (
                <div className="text-sm font-mono text-[var(--color-accent)] bg-[var(--color-paper)] brutal-border p-4">
                  {lang === 'vi' ? 'Lỗi hệ thống. Hãy thử lại.' : 'System error. Try again.'}
                </div>
              )}

              <button type="submit" disabled={isSending} className="btn-brutal-primary self-start !py-4 !px-12 !text-xl mt-4">
                {isSending ? (lang === 'vi' ? 'ĐANG GỬI...' : 'SENDING...') : (lang === 'vi' ? 'GỬI ĐI' : 'SEND')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
