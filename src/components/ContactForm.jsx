import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, MailIcon, CallIcon } from '@hugeicons/core-free-icons';
import { GithubIcon as Github, LinkedinIcon as Linkedin, FacebookIcon as Facebook, YoutubeIcon as Youtube, TiktokIcon as Tiktok, InstagramIcon as Instagram } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';
import MagneticButton from './MagneticButton';


export default function ContactForm() {
  const { lang } = useApp();
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    setSendError(false);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
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
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
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
    <section 
      id="contact" 
      ref={containerRef}
      className="py-32 px-6 md:px-8 max-w-5xl mx-auto overflow-hidden math-dots"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
        {/* Left Side: Text info & Socials */}
        <div 
          style={{ transitionDelay: '0ms' }}
          className={`md:col-span-5 flex flex-col justify-start gap-8 md:gap-10 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-accent-violet font-semibold tracking-wider uppercase mb-4">
              {lang === 'vi' ? "Liên hệ hợp tác" : "Partnerships"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none mb-6">
              {lang === 'vi' ? (
                <>
                  HỢP TÁC <br />
                  <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Kết Nối.</span>
                </>
              ) : (
                <>
                  COLLABORATE <br />
                  <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Connect.</span>
                </>
              )}
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mb-8">
              {lang === 'vi' 
                ? "Bạn có ý tưởng dự án cần phát triển, muốn hợp tác nghiên cứu học thuật hoặc tìm kiếm cơ hội đồng hành cùng nhau? Hãy gửi lời nhắn cho tôi."
                : "Have a project idea, academic research proposal, or looking to collaborate on a shared venture? Drop me a line."}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Email Contact */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 font-mono">
                {lang === 'vi' ? "Gửi Email trực tiếp" : "Send Direct Email"}
              </p>
              <a href={`mailto:${portfolioData.profile.email}`} className="text-neutral-700 dark:text-neutral-200 hover:text-accent-violet transition-colors duration-300 font-mono text-xs flex items-center gap-2 group w-max">
                <HugeiconsIcon icon={MailIcon} className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-accent-violet" />
                {portfolioData.profile.email}
              </a>
            </div>

            {/* Phone Contact */}
            {portfolioData.profile.phone && (
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2 font-mono">
                  {lang === 'vi' ? "Số điện thoại" : "Phone Number"}
                </p>
                <a href={`tel:${portfolioData.profile.phone}`} className="text-neutral-700 dark:text-neutral-200 hover:text-accent-violet transition-colors duration-300 font-mono text-xs flex items-center gap-2 group w-max">
                  <HugeiconsIcon icon={CallIcon} className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-accent-violet" />
                  {portfolioData.profile.phone}
                </a>
              </div>
            )}

            {/* Social icons */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 font-mono">
                {lang === 'vi' ? "Mạng xã hội" : "Social Channels"}
              </p>
              <div className="grid grid-cols-6 gap-2.5 w-max">
                {portfolioData.profile.github && (
                  <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.profile.linkedin && (
                  <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.profile.facebook && (
                  <a href={portfolioData.profile.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.profile.youtube && (
                  <a href={portfolioData.profile.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.profile.tiktok && (
                  <a href={portfolioData.profile.tiktok} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Tiktok className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.profile.instagram && (
                  <a href={portfolioData.profile.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all duration-300">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div 
          style={{ transitionDelay: '200ms' }}
          className={`md:col-span-7 md:mt-14 lg:mt-16 transform transition-all duration-1000 ease-out-custom ${
            inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
          }`}
        >
          {submitted ? (
            <div className="blueprint-card h-full min-h-[350px]">
              <div className="blueprint-inner p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center mb-6 animate-pulse">
                  <HugeiconsIcon icon={SentIcon} className="w-6 h-6 text-accent-emerald" />
                </div>
                <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-2">
                  {lang === 'vi' ? "Đã Gửi Thành Công!" : "Sent Successfully!"}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs font-sans font-light">
                  {lang === 'vi' 
                    ? "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn sớm nhất có thể."
                    : "Thank you for reaching out. I will respond to your message as soon as possible."}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name & Email in grid for side-by-side desktop display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input Group */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold font-mono px-1">
                    {lang === 'vi' ? "Họ & Tên" : "Full Name"}
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder={lang === 'vi' ? "Nhập họ và tên..." : "Enter your name..."}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black/[0.02] hover:bg-black/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/10 rounded-xl px-4 py-3.5 text-xs md:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all duration-300 font-sans"
                  />
                </div>

                {/* Email Input Group */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold font-mono px-1">
                    {lang === 'vi' ? "Địa Chỉ Email" : "Email Address"}
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder={lang === 'vi' ? "Nhập địa chỉ email..." : "Enter your email..."}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-black/[0.02] hover:bg-black/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/10 rounded-xl px-4 py-3.5 text-xs md:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all duration-300 font-sans"
                  />
                </div>
              </div>

              {/* Message Input Group */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-message" className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold font-mono px-1">
                  {lang === 'vi' ? "Lời Nhắn" : "Message"}
                </label>
                <textarea
                  id="form-message"
                  required
                  rows="4"
                  placeholder={lang === 'vi' ? "Nhập nội dung lời nhắn..." : "Enter your message..."}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-black/[0.02] hover:bg-black/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/10 rounded-2xl px-4 py-3.5 text-xs md:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none resize-none transition-all duration-300 font-sans"
                />
              </div>

              {sendError && (
                <div className="text-[10px] font-mono text-red-500 text-left mb-2">
                  {lang === 'vi' 
                    ? "Gửi tin thất bại! Vui lòng cấu hình VITE_WEB3FORMS_KEY." 
                    : "Sending failed! Please configure VITE_WEB3FORMS_KEY."}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-4 text-right">
                <MagneticButton
                  type="submit"
                  disabled={isSending}
                  className={`group px-6 py-2.5 rounded-full font-semibold text-[10px] tracking-widest uppercase flex items-center gap-4 cursor-pointer btn-glass-primary btn-shimmer ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSending 
                    ? (lang === 'vi' ? "Đang Gửi..." : "Sending...") 
                    : (lang === 'vi' ? "Gửi Tin Nhắn" : "Send Message")}
                  <span className="w-6 h-6 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center transition-all duration-300 ease-out-custom group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                    <HugeiconsIcon icon={SentIcon} className="w-3.5 h-3.5 text-white dark:text-black" />
                  </span>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
