import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import heroImg from '../assets/hero-woman.svg';
import facialIcon from '../assets/service-facial.svg';
import hairIcon from '../assets/service-hair.svg';
import maniIcon from '../assets/service-manicure.svg';
import pediIcon from '../assets/service-pedicure.svg';
import makeupIcon from '../assets/service-makeup.svg';
import bridalIcon from '../assets/service-bridal.svg';
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import g1 from '../assets/gallery1.svg';
import g2 from '../assets/gallery2.svg';
import g3 from '../assets/gallery3.svg';
import ig1 from '../assets/instagram1.svg';
import ig2 from '../assets/instagram2.svg';
import ig3 from '../assets/instagram3.svg';

export default function LuxeGlow() {
  const services = [
    { icon: facialIcon, title: 'Facial', desc: 'Rejuvenating facials for all skin types.' },
    { icon: hairIcon, title: 'Hair Styling', desc: 'Cut, color and bespoke styling.' },
    { icon: maniIcon, title: 'Manicure', desc: 'Luxury manicures with long-lasting finish.' },
    { icon: pediIcon, title: 'Pedicure', desc: 'Relaxing pedicures and foot care.' },
    { icon: makeupIcon, title: 'Makeup', desc: 'Daytime and evening glam looks.' },
    { icon: bridalIcon, title: 'Bridal', desc: 'Full bridal packages and trials.' }
  ];

  const testimonials = [
    { avatar: avatar1, name: 'Ana R.', text: 'LuxeGlow made my wedding day flawless — the team is so attentive and talented.' },
    { avatar: avatar2, name: 'Priya S.', text: 'I felt instantly transformed. The facial left my skin glowing for weeks.' },
    { avatar: avatar3, name: 'Maya K.', text: 'Professional, warm and the space is absolutely beautiful.' }
  ];

  const [slide, setSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const heroRef = useRef(null);
  const toggleRef = useRef(null);
  const firstMobileLinkRef = useRef(null);
  const [toast, setToast] = useState('');

  function showToast(msg){
    setToast(msg);
    setTimeout(()=>setToast(''), 2600);
  }
  useEffect(() => {
    if (!autoPlay) return undefined;
    const id = setInterval(() => setSlide(s => (s + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  // pause autoplay when hovering testimonials
  function onTestimonialsEnter(){ setAutoPlay(false); }
  function onTestimonialsLeave(){ setAutoPlay(true); }

  // Parallax effect for hero image
  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      // translate slightly based on scroll
      const y = (pct - 0.5) * 18; // -9 to 9
      heroRef.current.style.transform = `translateY(${y}px) scale(${1 + pct*0.02})`;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroRef]);

  // smooth in-page anchor scroll
  useEffect(() => {
    function handleAnchorClicks(e){
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.addEventListener('click', handleAnchorClicks);
    return () => document.removeEventListener('click', handleAnchorClicks);
  }, []);

  // IntersectionObserver for reveal-on-scroll animations
  useEffect(() => {
    const els = document.querySelectorAll('.animate');
    if (!('IntersectionObserver' in window)){
      els.forEach(el => el.classList.add('inview'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('inview');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // keyboard controls for lightbox
  useEffect(()=>{
    function onKey(e){
      if (lightboxIndex === -1) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  // lock body scroll when mobile nav open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isNavOpen]);

  // Manage focus for mobile nav open/close
  useEffect(() => {
    if (isNavOpen) {
      // focus the first link when opened
      setTimeout(() => firstMobileLinkRef.current?.focus(), 120);
    } else {
      // return focus to toggle
      toggleRef.current?.focus();
    }
  }, [isNavOpen]);

  // close mobile nav with Escape key
  useEffect(() => {
    function onKeyClose(e){
      if (e.key === 'Escape' && isNavOpen) setIsNavOpen(false);
    }
    window.addEventListener('keydown', onKeyClose);
    return () => window.removeEventListener('keydown', onKeyClose);
  }, [isNavOpen]);

  function handleBooking(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const service = form.get('service');
    const date = form.get('date');
    showToast(`Thanks ${name}! Request for ${service} on ${date} received — we'll contact you to confirm.`);
    e.target.reset();
  }

  function openLightbox(idx){ setLightboxIndex(idx); document.body.style.overflow='hidden'; }
  function closeLightbox(){ setLightboxIndex(-1); document.body.style.overflow=''; }
  function nextLightbox(){ setLightboxIndex(i => (i + 1) % gallery.length); }
  function prevLightbox(){ setLightboxIndex(i => (i - 1 + gallery.length) % gallery.length); }

  const gallery = [g1,g2,g3,g2,g1,g3];

  return (
    <div className="luxeglow-root">
      <header className="lg-header">
        <div className="container">
          <div className="nav-brand">
            <span className="logo-mark" aria-hidden></span>
            <div className="lg-logo">LuxeGlow</div>
          </div>
          <nav className="lg-nav">
            <a href="#about" onClick={()=>setIsNavOpen(false)}>About</a>
            <a href="#testimonials" onClick={()=>setIsNavOpen(false)}>Reviews</a>
            <a href="#gallery" onClick={()=>setIsNavOpen(false)}>Gallery</a>
          </nav>

          <button ref={toggleRef} className={`nav-toggle ${isNavOpen ? 'open' : ''}`} aria-label="Toggle navigation" aria-expanded={isNavOpen} onClick={()=>setIsNavOpen(s=>!s)}>
            <span className="burger" />
          </button>
        </div>

        <div className={`mobile-nav ${isNavOpen ? 'open' : ''}`} role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target.classList.contains('mobile-nav')) setIsNavOpen(false); }}>
          <div className="mobile-panel" onClick={(e)=>e.stopPropagation()}>
            <button type="button" className="mobile-close" aria-label="Close menu" onClick={()=>setIsNavOpen(false)}>✕</button>
            <div className="mobile-links">
              <a ref={firstMobileLinkRef} href="#about" onClick={()=>setIsNavOpen(false)}>About</a>
              <a href="#testimonials" onClick={()=>setIsNavOpen(false)}>Reviews</a>
              <a href="#gallery" onClick={()=>setIsNavOpen(false)}>Gallery</a>
            </div>
          </div>
        </div>
      </header>

      <section className="lg-hero">
        <div className="lg-hero-media">
          <img ref={heroRef} src={heroImg} alt="Confident woman" className="lg-hero-img" loading="lazy" />
        </div>
        <div className="hero-deco" aria-hidden>
          <div className="shape shape--1" />
          <div className="shape shape--2" />
        </div>
        <div className="lg-hero-overlay" />
        <div className="lg-hero-content">
          <p className="lg-eyebrow">LUXURY BEAUTY STUDIO</p>
          <h1 className="lg-title">Enhance Your Natural Beauty</h1>
          <p className="lg-sub">At LuxeGlow we believe beauty is personal — our treatments are tailored to enhance your natural radiance.</p>
          <div className="lg-actions">
            <a href="#booking" className="btn-primary">Book Appointment</a>
            <a href="#services" className="btn-ghost">View Services</a>
          </div>
          <div className="lg-scroll-indicator" aria-hidden>
            <span className="dot" />
            <span className="label">Scroll</span>
          </div>
        </div>
      </section>

      <main className="lg-main">
        <section id="about" className="lg-about">
          <div className="about-text">
            <h2>About LuxeGlow</h2>
            <p>We combine expert techniques with premium products in a calm, luxurious space. Our philosophy centers on enhancing your natural features through personalised treatments that leave you feeling confident and radiant.</p>
          </div>
          <div className="about-image">
            <img src={g1} alt="Salon interior" />
          </div>
        </section>

        <section id="services" className="lg-services">
          <h2>Our Services</h2>
          <p className="lead">Curated treatments to pamper and perfect. Choose the service that fits your needs.</p>
          <div className="services-grid">
            {services.map(s => (
              <div className="service-card" key={s.title}>
                <img src={s.icon} alt="" className="service-icon" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="lg-testimonials">
          <h2>What clients say</h2>
          <div className="test-slider">
            <button className="slide-btn" onClick={() => setSlide(s => (s - 1 + testimonials.length) % testimonials.length)}>&lt;</button>
            <div className="slide-wrap">
              {testimonials.map((t, i) => (
                <div className={`slide ${i === slide ? 'active' : ''}`} key={i}>
                  <img src={t.avatar} alt={t.name} className="avatar" />
                  <p className="quote">“{t.text}”</p>
                  <p className="client">{t.name}</p>
                </div>
              ))}
            </div>
            <button className="slide-btn" onClick={() => setSlide(s => (s + 1) % testimonials.length)}>&gt;</button>
          </div>
        </section>

        <section id="gallery" className="lg-gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {gallery.map((img, idx) => (
              <img key={idx} src={img} alt={`gallery ${idx}`} onClick={() => openLightbox(idx)} loading="lazy" />
            ))}
          </div>
          {lightboxIndex > -1 && (
            <div className="lightbox" role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target.classList.contains('lightbox')) closeLightbox(); }}>
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
              <button className="lightbox-prev" onClick={(e)=>{ e.stopPropagation(); prevLightbox(); }} aria-label="Previous">‹</button>
              <div className="lightbox-inner">
                <img src={gallery[lightboxIndex]} alt={`light ${lightboxIndex}`} />
              </div>
              <button className="lightbox-next" onClick={(e)=>{ e.stopPropagation(); nextLightbox(); }} aria-label="Next">›</button>
            </div>
          )}
        </section>

        <section id="booking" className="lg-booking">
          <h2>Book an Appointment</h2>
          <form className="booking-form" onSubmit={handleBooking}>
            <div className="row">
              <label>
                Name
                <input name="name" required />
              </label>
              <label>
                Service
                <select name="service" required>
                  <option>Facial</option>
                  <option>Hair Styling</option>
                  <option>Manicure</option>
                  <option>Pedicure</option>
                  <option>Makeup</option>
                  <option>Bridal Package</option>
                </select>
              </label>
            </div>
            <div className="row">
              <label>
                Date
                <input type="date" name="date" required />
              </label>
              <label>
                Time
                <input type="time" name="time" required />
              </label>
            </div>
            <label>
              Contact (phone or email)
              <input name="contact" required />
            </label>
            <button type="submit" className="btn-primary">Request Booking</button>
          </form>
        </section>

        <section id="contact" className="lg-contact">
          <div className="contact-info">
            <h3>Contact</h3>
            <p>123 Rose Avenue, Suite 12<br/>Cityname, Country</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: hello@luxeglow.com</p>
            <div className="socials">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="map" src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" />
          </div>
        </section>
      </main>

      <footer className="lg-footer">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="lg-logo">LuxeGlow</div>
            <p className="muted">A sanctuary of timeless beauty. We focus on enhancing natural features using premium techniques and products.</p>
            <form className="newsletter" onSubmit={(e)=>{ e.preventDefault(); const val = new FormData(e.target).get('email'); showToast(`Thanks — we'll notify ${val}`); e.target.reset(); }}>
              <label className="newsletter-label">Join our Newsletter</label>
              <div className="newsletter-row">
                <input name="email" type="email" placeholder="Your email" required />
                <button type="submit" className="btn-primary small">Subscribe</button>
              </div>
            </form>
          </div>

          <div className="footer-col footer-links-col">
            <h4>Explore</h4>
            <nav className="quick-links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#gallery">Gallery</a>
              <a href="#booking">Book</a>
            </nav>
            <h4 className="contact-head">Contact</h4>
            <address className="contact-block">
              <div>123 Rose Avenue, Suite 12</div>
              <div>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></div>
              <div>Email: <a href="mailto:hello@luxeglow.com">hello@luxeglow.com</a></div>
            </address>
          </div>

          <div className="footer-col footer-ig">
            <h4>Instagram</h4>
            <div className="ig-grid">
              <img src={ig1} alt="ig" loading="lazy" />
              <img src={ig2} alt="ig" loading="lazy" />
              <img src={ig3} alt="ig" loading="lazy" />
              <img src={g1} alt="ig" loading="lazy" />
              <img src={g2} alt="ig" loading="lazy" />
              <img src={g3} alt="ig" loading="lazy" />
            </div>
            <div className="social-row">
              <a href="#" aria-label="instagram" className="social-icon">IG</a>
              <a href="#" aria-label="facebook" className="social-icon">FB</a>
              <a href="#" aria-label="tiktok" className="social-icon">TT</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">© {new Date().getFullYear()} LuxeGlow. All rights reserved.</div>
          <div className="ft-links"><a href="#privacy">Privacy</a> · <a href="#terms">Terms</a></div>
        </div>
      </footer>
      {toast && (
        <div className="lg-toast" role="status" aria-live="polite" onClick={()=>setToast('')}>{toast}</div>
      )}
    </div>
  );
}
