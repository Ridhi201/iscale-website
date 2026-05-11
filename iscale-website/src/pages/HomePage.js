import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, CheckCircle, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import useReveal from '../hooks/useReveal';

/* ── Hero Section ── */
const Hero = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', contact: '', whatsapp: '', gender: 'male', sameWA: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly for the FREE Live Class.');
  };

  return (
    <section style={{ background: 'var(--gradient-hero)', padding: '80px 0 60px', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container hero-grid">
        {/* Left content */}
        <div style={{ animation: 'fadeUp 0.7s ease forwards' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', borderRadius: 100, padding: '8px 18px',
            marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontSize: 14, fontWeight: 500
          }}>
            🏆 Upskilling millions for tech readiness
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 30, color: '#1a1a2e' }}>
            <span style={{ color: 'var(--red)' }}>Upskilling & E-Learning</span><br />
            Platform for Future<br />
            Readiness.
          </h1>

          <p style={{ color: '#555', fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
            In India, millions of professionals and college graduates lack affordable access to industry-aligned education. iScale aims to democratize it, blending quality with affordability to create a widespread impact.
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={() => setCurrentPage('courses')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'var(--red)', color: '#fff',
                borderRadius: 10, fontWeight: 600, fontSize: 16,
                boxShadow: '0 4px 20px rgba(192,0,12,0.35)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(192,0,12,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(192,0,12,0.35)'; }}
            >
              View Courses <ArrowRight size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats-grid" style={{ marginTop: 48 }}>
            {[
              { icon: <Users size={20} />, val: '100K+', label: 'Community Members' },
              { icon: <BookOpen size={20} />, val: '50+', label: 'Courses Available' },
              { icon: <Award size={20} />, val: '95%', label: 'Placement Rate' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: 'var(--red)' }}>{stat.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{stat.val}</div>
                  <div style={{ color: '#777', fontSize: 12 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div 
          className="animate-float"
          style={{
            background: '#fff', borderRadius: 20, padding: 32,
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            animation: 'fadeUp 0.7s 0.2s ease both'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            Book a <span style={{ color: 'var(--red)' }}>FREE</span> Live class NOW!
          </h3>
          <p style={{ color: '#777', fontSize: 13, marginBottom: 24 }}>Fill your details and select a date for your live class</p>

          <div className="form-grid">
            {[['First Name *', 'firstName'], ['Last Name *', 'lastName']].map(([label, key]) => (
              <div key={key}>
                <input
                  placeholder={label}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 0', border: 'none',
                    borderBottom: '1.5px solid #ddd', fontSize: 14,
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
            ))}
          </div>

          {[['Email *', 'email', 'email'], ['Contact Number *', 'contact', 'tel']].map(([label, key, type]) => (
            <input
              key={key}
              type={type}
              placeholder={label}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{
                width: '100%', padding: '12px 0', border: 'none',
                borderBottom: '1.5px solid #ddd', fontSize: 14,
                marginTop: 12, transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--red)'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          ))}

          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666', cursor: 'pointer', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={form.sameWA}
                onChange={e => setForm({ ...form, sameWA: e.target.checked, whatsapp: e.target.checked ? form.contact : '' })}
                style={{ accentColor: 'var(--red)' }}
              />
              Same as my Whatsapp Number
            </label>
            {!form.sameWA && (
              <input
                placeholder="Whatsapp Number *"
                value={form.whatsapp}
                onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                style={{
                  width: '100%', padding: '10px 0', border: 'none',
                  borderBottom: '1.5px solid #ddd', fontSize: 14
                }}
              />
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 8 }}>Gender *</label>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Male', 'Female', 'Others'].map(g => (
                <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                  <input
                    type="radio" name="gender" value={g.toLowerCase()}
                    checked={form.gender === g.toLowerCase()}
                    onChange={() => setForm({ ...form, gender: g.toLowerCase() })}
                    style={{ accentColor: 'var(--red)' }}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%', marginTop: 24,
              padding: '14px', background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
              color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(192,0,12,0.35)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            GET IT NOW <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── About iScale Learning ── */
const AboutSection = () => (
  <section className="reveal" style={{ padding: '80px 0', background: '#fff' }}>
    <div className="container about-grid">
      {/* Video card */}
      <div style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        aspectRatio: '9/16', position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        border: '8px solid #fff',
        transition: 'transform 0.3s ease',
        height: 'auto',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '340px',
        margin: '0 auto'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <iframe 
          src="https://player.vimeo.com/video/1023513221" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 16 }} 
          title="iScale Learning"
        ></iframe>
      </div>

      {/* Content */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, marginBottom: 20, lineHeight: 1.1, color: '#111' }}>
          Know About <span style={{ color: 'var(--red)' }}>iScale</span><br />Learning
        </h2>
        <p style={{ color: '#666', fontSize: 16, lineHeight: 1.75, marginBottom: 40, maxWidth: 540 }}>
          A well-organized and flexible program that takes care of you. You start as a Beginner, Intermediate, or Advanced learner based on your skills.
        </p>
        <div className="features-grid">
          {[
            { 
              color: '#fff9c4', 
              icon: <div style={{ background: '#fbc02d', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Star size={22} fill="currentColor" /></div>, 
              title: 'Realtime Projects', 
              desc: 'Dive into Industry-Oriented Projects, where learning meets real-world impact' 
            },
            { 
              color: '#e3f2fd', 
              icon: <div style={{ background: '#1e88e5', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'LIVE Class', 
              desc: 'Never face challenges alone, our instant Doubt support is always available.' 
            },
            { 
              color: '#fce4ec', 
              icon: <div style={{ background: '#e91e63', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'Outcome Driven', 
              desc: 'Elevate your learning journey with Outcome-Driven magic.' 
            },
          ].map(card => (
            <div key={card.title} style={{
              background: card.color, borderRadius: 16, padding: 24,
              transition: 'all 0.3s ease',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'; }}
            >
              {card.icon}
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 10, color: '#111' }}>{card.title}</h4>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
              <button style={{ background: 'none', border: 'none', color: '#111', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginTop: 'auto' }}>
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Student Testimonials ── */
const testimonialIds = [
  'HCQZefa6sZ0', 'g-mq68g01q4', 'Tsz599KMhFg', 'RUNeRI_RJTk', 'fyDH1A9PM6E', 'ydsy68hZZ9s', 
  'QhV3XV3H3bI', 'wUl57Dnug10', '9K24kWRTXUM', 'ys_HeTrwuVo', 'aWNs5K5__r4', 'pt3vt-V8S6M', 
  'tZh1PFRdp68', 'WA8sdZPhF8Q', 'Np4YMar2ikQ', 'CBajJDIhVPE', 'kYp4oCNLNwU', 'e6ISquijgnI', 
  'N8bbojrdvwA', 'GEsRrHmtt0k', 'ify7LBNBttU', 'AO9p-55o2UM', 'xmh3TnoOr3o', 'gQsslKsEr-Q', 
  'Y1TduDsF844', 'F95x1cB6aaA', 'mneeIHg0L6M', 'vu2TvJXMXCY', 'pVz7InS29Qw', 'kXDIOvTXLQE', 
  '6Bwd5RRLJps', 'd-mpauGxxBg', 'T1EXdCBLUok', 'ROgY3-4RDfQ', '8-kAhYnd7xk', '_fDE0Z-Go9A', 
  'fTJtzMPAMhI', '17OxKf3TDLE'
];

const TestimonialsSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="reveal" style={{ padding: '80px 0', background: '#f9f9f9', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>THE ISCALE</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Students Testimonials</h2>

        <style>{`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={scrollLeft}
            style={{
              position: 'absolute', left: 10, zIndex: 10, width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronLeft size={24} color="#333" />
          </button>

          <div 
            ref={scrollRef}
            className="hide-scroll"
            style={{ 
              display: 'flex', gap: 16, overflowX: 'auto', padding: '10px 0', 
              scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory',
              width: '100%', scrollBehavior: 'smooth'
            }}
          >
            {testimonialIds.map((id, index) => (
              <div key={index} style={{ 
                minWidth: 180, height: 320, borderRadius: 12, overflow: 'hidden', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', background: '#000',
                scrollSnapAlign: 'start', flexShrink: 0
              }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}?autoplay=0&controls=0`}
                  title="Student Testimonial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            style={{
              position: 'absolute', right: 10, zIndex: 10, width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronRight size={24} color="#333" />
          </button>
        </div>

      </div>
    </section>
  );
};

/* ── Latest Job Updates ── */
const updatedJobData = [
  { company: 'm360Research', role: 'Analyst - Reporting, Data Services', salary: 'INR 6,00,000 - 12,00,000 PA', type: 'red' },
  { company: 'SAXO', role: 'Apprentice- Business Analyst', salary: 'INR 25,000 - 35,000 PA', type: 'white', logoBg: '#1e3a8a', logoColor: '#fff' },
  { company: 'H', role: 'Accounts Payable Analyst', salary: 'INR 30,000 - 45,000 PA', type: 'red' },
  { company: 'MANN+HUMMEL', role: 'Specialist - Analytics', salary: 'INR 35,000 - 65,000 PA', type: 'white', logoColor: '#2e7d32' },
  { company: 'WM', role: 'India Junior Analyst, Process', salary: 'INR 3,00,000 - 4,50,000 PA', type: 'red' },
  { company: 'Cushman & Wakefield', role: 'Analyst - CRE Due Diligence', salary: 'INR 6,50,000 - 8,50,000 PA', type: 'white', logoBg: '#1e1b4b', logoColor: '#fff' },
  { company: 'INNOCEAN', role: 'Management Trainee', salary: 'INR 18,000 - 25,000 PA', type: 'red' },
  { company: 'TOOLYT', role: 'Business Analyst - Fresher at Toolyt', salary: 'INR 2,00,000 - 3,50,000 PA', type: 'white', logoBg: '#0f172a', logoColor: '#fff' },
  { company: 'Gallagher', role: 'Business Analyst - Gallagher', salary: 'INR 4,00,000 - 7,50,000 PA', type: 'red' }
];

const LatestUpdates = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="reveal" style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#eef2ff', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>EXPLORE OPPORTUNITIES</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>Latest Updates</h2>

        <style>{`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={scrollLeft}
            style={{
              position: 'absolute', left: -24, zIndex: 10, width: 48, height: 48, borderRadius: '50%',
              background: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronLeft size={24} color="#333" />
          </button>

          <div 
            ref={scrollRef}
            className="hide-scroll"
            style={{ 
              display: 'flex', gap: 24, overflowX: 'auto', padding: '10px 0', 
              scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory',
              width: '100%', scrollBehavior: 'smooth'
            }}
          >
            {updatedJobData.map((job, i) => (
              <div key={i}
                style={{
                  minWidth: 340, height: 220, borderRadius: 12, padding: '32px 24px', 
                  background: job.type === 'red' ? 'linear-gradient(135deg, #b91c1c, #7f1d1d)' : '#fff',
                  color: job.type === 'red' ? '#fff' : '#0f172a',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', scrollSnapAlign: 'start', flexShrink: 0
                }}>
                
                {job.type === 'red' && (
                  <div style={{ position: 'absolute', top: 24, right: 32, fontSize: 60, fontFamily: 'serif', lineHeight: 0.5, color: 'rgba(255,255,255,0.9)' }}>
                    “
                  </div>
                )}

                <div style={{ 
                  background: job.logoBg || '#fff', 
                  color: job.logoColor || '#0f172a', 
                  fontWeight: 800,
                  width: 100, height: 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8, marginBottom: 20,
                  boxShadow: job.type === 'white' && !job.logoBg ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                  fontSize: 16, textAlign: 'center', padding: '10px',
                  lineHeight: 1.2
                }}>
                  {job.company}
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 8, textAlign: 'center' }}>{job.role}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: job.type === 'red' ? '#fca5a5' : '#64748b' }}>{job.salary}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            style={{
              position: 'absolute', right: -24, zIndex: 10, width: 48, height: 48, borderRadius: '50%',
              background: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronRight size={24} color="#333" />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button style={{
            padding: '12px 32px', background: '#eef2ff', color: 'var(--red)', borderRadius: 8,
            fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Popular Courses ── */
const coursesData = [
  { tag: 'LIVE', title: 'AI Cohort Course Batch 01', subtitle: 'Complete AI Guide for Everyone', price: '₹4,999', original: '₹14,999', img: '🤖', color: '#1a1a2e' },
  { tag: 'APP + WEB', title: 'Complete AI Guide', subtitle: 'For Everyone', price: '₹2,999', original: '₹9,999', img: '💻', color: '#16213e' },
  { tag: 'POPULAR', title: 'Data Science Masters', subtitle: 'From Beginner to Pro', price: '₹5,999', original: '₹18,999', img: '📊', color: '#0f3460' },
  { tag: 'NEW', title: 'Business Analytics', subtitle: 'Complete Course', price: '₹3,499', original: '₹11,999', img: '📈', color: '#533483' },
];

const PopularCourses = ({ setCurrentPage, onCourseSelect }) => (
  <section className="reveal" style={{ padding: '80px 0', background: '#f4f4f8' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>TOP POPULAR COURSES</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>
        Most Popular <span style={{ color: 'var(--red)' }}>Courses</span>
      </h2>

      <div className="courses-grid">
        {coursesData.map((course, i) => (
          <div key={i} style={{
            borderRadius: 16, overflow: 'hidden', background: '#fff',
            boxShadow: 'var(--shadow-card)', transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => onCourseSelect(course.title)}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
          >
            {/* Course image */}
            <div style={{
              background: course.color, height: 180,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              position: 'relative', padding: 20
            }}>
              <span style={{
                position: 'absolute', top: 12, left: 12,
                background: course.tag === 'LIVE' ? '#e50000' : '#333',
                color: '#fff', padding: '3px 10px',
                borderRadius: 100, fontSize: 11, fontWeight: 700
              }}>
                {course.tag === 'LIVE' ? '🔴 LIVE' : course.tag}
              </span>
              <div style={{ fontSize: 64 }}>{course.img}</div>
            </div>

            {/* Card content */}
            <div style={{ padding: 16 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4, lineHeight: 1.3 }}>{course.title}</h4>
              <p style={{ color: '#888', fontSize: 12, marginBottom: 12 }}>{course.subtitle}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--red)' }}>{course.price}</span>
                <span style={{ color: '#aaa', fontSize: 13, textDecoration: 'line-through' }}>{course.original}</span>
              </div>
              <button
                onClick={() => setCurrentPage('login')}
                style={{
                  marginTop: 14, width: '100%', padding: '10px',
                  background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontWeight: 600, fontSize: 13,
                  border: 'none', cursor: 'pointer', transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
                onMouseLeave={e => e.target.style.background = 'var(--red)'}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Industry Experts ── */
const experts = [
  { name: 'Prasad Menon', role: 'CHRO', company: 'Amagi, Flipkart', logo: 'amagi', img: '👔' },
  { name: 'Mr Jaibir Siwach', role: 'CEO & Founder', company: 'Kabira Mobility', logo: 'kabira', img: '👨‍💼' },
  { name: 'Harjeet Khanduja', role: 'Vice President', company: 'Reliance Jio', logo: 'jio', img: '👳' },
  { name: 'Mr Rahil Gupta', role: 'Co-founder and CTO', company: 'Hop Electric Vehicle', logo: 'hop', img: '🧑‍💻' },
  { name: 'Mr. Dhiraj Shetty', role: 'Sr. G.M. - HR & Operations', company: 'Ultraviolette Automotive', logo: 'uv', img: '👨‍🏫' },
];

const ExpertsSection = () => {
  const [idx, setIdx] = useState(0);

  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>LEADERS TALK</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>Talk With Industry Experts</h2>
        <p style={{ color: '#777', textAlign: 'center', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
          Dive into industry-centric learning, shaped by direct input from CEOs and CHROs. Elevate your skills with insights that set you apart.
        </p>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setIdx(Math.max(0, idx - 1))}
            style={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-card)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={18} />
          </button>

          <div className="experts-grid">
            {experts.map((expert, i) => (
              <div key={i} style={{
                border: '1px solid #eee', borderRadius: 16, padding: 20,
                textAlign: 'center', transition: 'all 0.3s',
                background: '#fff', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#eee'; }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: `hsl(${i * 60}, 30%, 85%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 40, margin: '0 auto 12px'
                }}>
                  {expert.img}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{expert.name}</div>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 12 }}>{expert.role}</div>
                <div style={{ color: '#555', fontSize: 11, marginBottom: 16, padding: '8px', background: '#f8f8f8', borderRadius: 8 }}>{expert.company}</div>
                <button style={{
                  width: '100%', padding: '8px', background: 'var(--red)',
                  color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 12,
                  border: 'none', cursor: 'pointer'
                }}>Know More</button>
              </div>
            ))}
          </div>

          <button onClick={() => setIdx(Math.min(1, idx + 1))}
            style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-card)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button style={{ padding: '10px 28px', border: '1.5px solid #ddd', borderRadius: 100, background: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>View All</button>
        </div>
      </div>
    </section>
  );
};

/* ── Company Logos Marquee ── */
const companies = ['BAXY', 'magenta', 'airblack', 'OSM', 'planetspark', 'OLA ELECTRIC', 'Deloitte', 'Accenture', 'Reliance', 'Flipkart'];

const CompanyMarquee = () => (
  <section style={{ padding: '60px 0', background: '#f9f9f9', overflow: 'hidden' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>TOP COMPANIES</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40 }}>
        For <span style={{ color: 'var(--red)' }}>Placement</span> Opportunities
      </h2>
    </div>
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', gap: 40, animation: 'marquee 20s linear infinite' }}>
        {[...companies, ...companies].map((c, i) => (
          <div key={i} style={{
            padding: '12px 28px', background: '#fff', borderRadius: 12,
            boxShadow: 'var(--shadow-card)', display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#333',
            whiteSpace: 'nowrap', minWidth: 140, justifyContent: 'center'
          }}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <button style={{ padding: '10px 28px', border: '1.5px solid #ddd', borderRadius: 100, background: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>View All Our Clients</button>
    </div>
  </section>
);

/* ── Success Stories ── */
const successStories = [
  { name: 'Manas Jyoti Borah', company: 'The GoodGlamm Group', feedback: "A big thank you to 'The iSCALE' for a successful placement. Educator's and Placement team support's a lot!", emoji: '👨‍💼' },
  { name: 'Aditya Singh', company: 'Network Tech', feedback: 'iScale helped me transition from banking to data analytics. The curriculum is industry-focused and very practical.', emoji: '🧑‍💻' },
  { name: 'Amit Verma', company: 'Top MNC', feedback: 'The mentors at iScale are amazing. They guided me throughout my learning journey and helped land my dream job.', emoji: '👨‍💼' },
];

export const SuccessStories = () => (
  <section style={{ padding: '80px 0', background: 'var(--gradient-pink)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>WALL OF FAME</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Success Stories</h2>

      <div className="success-grid">
        {/* Featured story */}
        <div className="featured-story" style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 120, height: 160, background: '#f0f0f0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
              {successStories[0].emoji}
            </div>
            <div style={{ position: 'absolute', top: -8, left: -8, background: 'var(--red)', color: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
              {successStories[0].company}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{successStories[0].name}</h3>
            <p style={{ color: 'var(--red)', fontSize: 14, marginBottom: 16 }}>@ {successStories[0].company}</p>
            <p style={{ color: '#555', lineHeight: 1.7 }}>{successStories[0].feedback}</p>
          </div>
        </div>

        {/* Side stories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {successStories.slice(1).map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-card)', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 60, height: 60, background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                {s.emoji}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 4 }}>@ {s.company}</div>
                <div style={{ color: '#777', fontSize: 12, lineHeight: 1.5 }}>{s.feedback.substring(0, 80)}...</div>
              </div>
            </div>
          ))}
          <button style={{
            padding: '12px', background: 'var(--red)', color: '#fff',
            borderRadius: 12, fontWeight: 700, fontSize: 14,
            border: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            View All Stories <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

/* ── Main Home Page ── */
const HomePage = ({ setCurrentPage, onCourseSelect }) => {
  useReveal();
  return (
    <div>
    <Hero setCurrentPage={setCurrentPage} />
    <AboutSection />
    <TestimonialsSection />
    <LatestUpdates />
    <PopularCourses setCurrentPage={setCurrentPage} onCourseSelect={onCourseSelect} />
    <ExpertsSection />
    <CompanyMarquee />
    
    {/* Allied Colleges Section */}
    <section className="reveal" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>PARTNERSHIPS</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Our Allied Colleges</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {[
            'Mandsaur University', 'Silver Oak University', 'Lokmanya Tilak College of Engineering',
            'Rajkiya Engineering College', "MGM's College of Engineering and Technology",
            'D J Sanghvi College of Engineering, Mumbai', 'HRIT Group of Institutions', 'Medicaps University'
          ].map((college, i) => (
            <div key={i} style={{
              padding: '24px', background: '#f8f9ff', borderRadius: 16, border: '1px solid #eee',
              textAlign: 'center', transition: 'all 0.3s', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#eee'; }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{college}</h4>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button style={{ padding: '10px 28px', border: '1.5px solid #ddd', borderRadius: 100, background: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>View All Allied College</button>
        </div>
      </div>
    </section>

    <SuccessStories />
  </div>
    );
};

export default HomePage;
