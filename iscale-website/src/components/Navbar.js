import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Youtube, Users, Clock, Facebook, Twitter, Linkedin, Instagram, Send, MessageCircle } from 'lucide-react';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
    <div style={{
      width: 44, height: 44,
      background: 'var(--red)',
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>i</span>
    </div>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
      <span style={{ color: 'var(--red)' }}>i</span>SCALE
    </span>
  </div>
);

const courseData = {
  'AI Kickstart': [
    { title: 'AI Cohort Course - Batch 01', path: '/ai-cohort' },
    { title: 'Complete AI Guide for Everyone', path: '/ai-guide' }
  ],
  'Data Science Courses': [
    { title: 'Data Science with Generative AI Course', path: '/data-science-gen-ai' }
  ],
  'Data Analyst Courses': [
    { title: 'Master Of Data Analytics Program', path: '/data-analyst' },
    { title: 'Power BI Masterclass', path: '/power-bi' }
  ],
  'Foundation Courses': [
    { title: 'Advance Python with AI Tools', path: '/advance-python-ai' },
    { title: 'AI Powered Excel Full Course', path: '/ai-excel' },
    { title: 'SQL for Data Analysts', path: '/sql' },
    { title: 'Power BI & Tableau For Data Visualization', path: '/powerbi-tableau' }
  ],
  'Free Category': [
    { title: 'Free Data Science Course', path: '/free-ds' },
    { title: 'Free Data Analytics Course', path: '/free-da' }
  ]
};

const Navbar = ({ currentPage, setCurrentPage, loggedInUser, onLogout, onCourseSelect }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState('AI Kickstart');
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = ['Home', 'Explore Courses', 'Events'];

  return (
    <>

      {/* Main navbar */}
      {/* Top Contact Bar */}
      <div style={{
        background: '#f8f9fa',
        borderBottom: '1px solid #eee',
        padding: '8px 0',
        fontSize: '13px',
        color: '#666'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="https://www.youtube.com/@theiScale" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--red)', fontWeight: 600 }}>
              <Youtube size={14} /> 100k Community
            </a>
            <a href="https://wa.me/+917880113112" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#25D366' }}>●</span> +91-7880113112
            </a>
          </div>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <a href="#" style={{ color: '#666' }}><Facebook size={14} /></a>
            <a href="#" style={{ color: '#666' }}><Twitter size={14} /></a>
            <a href="#" style={{ color: '#666' }}><Linkedin size={14} /></a>
            <a href="#" style={{ color: '#666' }}><Instagram size={14} /></a>
            <a href="#" style={{ color: '#666' }}><Send size={14} /></a>
            <a href="#" style={{ color: '#666' }}><MessageCircle size={14} /></a>
          </div>
        </div>
      </div>

      <nav style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 0 #eee',
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, gap: 32
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="https://www.theiscale.com/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Logo />
            </a>

            <div 
              style={{ position: 'relative' }}
              ref={dropdownRef}
            >
              <button
                className="desktop-flex"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                style={{
                  alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 8,
                  border: `1.5px solid ${coursesDropdownOpen ? 'var(--red)' : '#ddd'}`, 
                  background: '#f9f9f9',
                  color: coursesDropdownOpen ? 'var(--red)' : '#000',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                ▦ Courses
              </button>

              {/* Mega Menu Dropdown */}
              {coursesDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  borderRadius: 12, display: 'flex', minWidth: 600, zIndex: 1000,
                  marginTop: 10, overflow: 'hidden', border: '1px solid #eee'
                }}>
                  {/* Left Column: Categories */}
                  <div style={{ width: 220, background: '#fcfcfc', borderRight: '1px solid #eee', padding: '12px 0' }}>
                    {Object.keys(courseData).map(cat => (
                      <div
                        key={cat}
                        onMouseEnter={() => setActiveCourseCategory(cat)}
                        style={{
                          padding: '12px 24px',
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: activeCourseCategory === cat ? 600 : 500,
                          color: activeCourseCategory === cat ? 'var(--red)' : '#444',
                          background: activeCourseCategory === cat ? '#f5f5f5' : 'transparent',
                          transition: 'all 0.2s',
                          borderLeft: activeCourseCategory === cat ? '3px solid var(--red)' : '3px solid transparent'
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Courses */}
                  <div style={{ flex: 1, padding: '20px 24px' }}>
                    <div style={{ color: '#888', fontSize: 12, fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {activeCourseCategory}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {courseData[activeCourseCategory].map((course, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            onCourseSelect(course.title);
                            setCoursesDropdownOpen(false);
                          }}
                          style={{
                            padding: '12px 0',
                            cursor: 'pointer',
                            fontSize: 15,
                            color: '#333',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#333'; }}
                        >
                          {course.title}
                          <span style={{ fontSize: 12, opacity: 0.5 }}>→</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav links */}
          <div className="desktop-flex" style={{ gap: 4, flex: 1, justifyContent: 'center' }}>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
                style={{
                  padding: '8px 16px', background: 'none', border: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
                  color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333',
                  borderRadius: 8, transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333'}
              >
                {item}
              </button>
            ))}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '8px 16px', background: 'none', border: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
                  color: '#333', borderRadius: 8, cursor: 'pointer'
                }}
              >
                More <ChevronDown size={14} />
              </button>
              {moreOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#fff', boxShadow: 'var(--shadow-lg)',
                  borderRadius: 12, padding: 8, minWidth: 160, zIndex: 200
                }}>
                  {['Job Updates', 'Success Story', 'Placement Talks'].map(item => (
                    <button
                      key={item}
                      onClick={() => { 
                        setCurrentPage(item.toLowerCase().replace(' ', '-'));
                        setMoreOpen(false); 
                      }}
                      style={{
                        display: 'block', width: '100%', padding: '10px 16px',
                        background: 'none', border: 'none', textAlign: 'left',
                        fontFamily: 'var(--font-body)', fontSize: 14,
                        borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s',
                        color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333'
                      }}
                      onMouseEnter={e => e.target.style.background = '#f5f5f5'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="desktop-flex" style={{ gap: 12, alignItems: 'center' }}>
            {loggedInUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span 
                  onClick={() => setCurrentPage('dashboard')}
                  style={{ 
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, 
                    color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 
                  }}
                >
                   👤 {loggedInUser.firstName}
                </span>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  style={{
                    padding: '10px 22px',
                    background: 'var(--red)',
                    color: '#fff',
                    borderRadius: 8,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 12px rgba(192,0,12,0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
                >
                  My Dashboard
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                style={{
                  padding: '10px 22px',
                  background: 'var(--red)',
                  color: '#fff',
                  borderRadius: 8,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600, fontSize: 14,
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 12px rgba(192,0,12,0.3)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
              >
                Login/Register
              </button>
            )}
            <a href="#" style={{ display: 'block' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                style={{ height: 40 }} 
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-only">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mobile-only" style={{
            position: 'absolute', top: '100%', left: 0, width: '100%',
            background: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 99
          }}>
            {/* Mobile Courses Accordion */}
            <div style={{ border: '1.5px solid #ddd', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              <button
                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', background: '#f9f9f9', border: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: '#333'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>▦ Courses</span>
                <ChevronDown size={18} style={{ transform: mobileCoursesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              
              {mobileCoursesOpen && (
                <div style={{ background: '#fff', padding: '8px' }}>
                  {Object.keys(courseData).map(category => (
                    <div key={category} style={{ marginBottom: 4 }}>
                      <button
                        onClick={() => setMobileCategoryOpen(mobileCategoryOpen === category ? null : category)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 12px', background: mobileCategoryOpen === category ? '#fff5f5' : 'transparent',
                          border: 'none', borderRadius: 8, textAlign: 'left',
                          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                          color: mobileCategoryOpen === category ? 'var(--red)' : '#555'
                        }}
                      >
                        {category}
                        <ChevronDown size={14} style={{ transform: mobileCategoryOpen === category ? 'rotate(180deg)' : 'none', opacity: 0.5 }} />
                      </button>
                      
                      {mobileCategoryOpen === category && (
                        <div style={{ padding: '4px 0 8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {courseData[category].map((course, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                onCourseSelect(course.title);
                                setMobileOpen(false);
                              }}
                              style={{
                                width: '100%', padding: '10px 12px', background: 'transparent', border: 'none',
                                textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 13, color: '#666',
                                display: 'flex', alignItems: 'center', gap: 8
                              }}
                            >
                              <div style={{ width: 4, height: 4, background: '#ddd', borderRadius: '50%' }} />
                              {course.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setMobileOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '12px 0',
                  background: 'none', border: 'none', borderBottom: '1px solid #eee',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
                  color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333'
                }}
              >
                {item}
              </button>
            ))}
            {['Job Updates', 'Success Story', 'Placement Talks'].map(item => (
              <button
                key={item}
                onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setMobileOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '12px 0',
                  background: 'none', border: 'none', borderBottom: '1px solid #eee',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 16,
                  color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333'
                }}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => { setCurrentPage('login'); setMobileOpen(false); }}
              style={{
                width: '100%', padding: '14px', background: 'var(--red)', color: '#fff',
                borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16,
                marginTop: 8
              }}
            >
              Login/Register
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
