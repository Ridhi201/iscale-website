import React, { useState } from 'react';
import { Search, RotateCcw, Calendar, Filter, MapPin, Briefcase, IndianRupee, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const jobData = [
  {
    title: 'Apprentice- Business Analyst',
    company: 'Saxo Bank',
    salary: '₹ 25,000 - 35,000 PM',
    location: 'Gurugram, Haryana, India',
    exp: 'Fresher',
    logo: 'https://logo.clearbit.com/saxobank.com'
  },
  {
    title: 'Accounts Payable Analyst',
    company: 'Huron',
    salary: '₹ 30,000 - 45,000 PM',
    location: 'Bengaluru, Karnataka, India',
    exp: '0-1 Year',
    logo: 'https://logo.clearbit.com/huronconsultinggroup.com'
  },
  {
    title: 'Specialist - Analytics',
    company: 'MANN+HUMMEL',
    salary: '₹ 35,000 - 65,000 PM',
    location: 'Bengaluru, Karnataka, India',
    exp: '0-3 Years',
    logo: 'https://logo.clearbit.com/mann-hummel.com'
  },
  {
    title: 'India Junior Analyst, Process',
    company: 'WM',
    salary: '₹ 3,00,000 - 4,50,000 PA',
    location: 'Gurugram, Haryana, India',
    exp: '6 months',
    logo: 'https://logo.clearbit.com/wm.com'
  },
  {
    title: 'Analyst - CRE Due Diligence',
    company: 'Cushman & Wakefield',
    salary: '₹ 6,50,000 - 8,50,000 PA',
    location: 'Gurugram, Haryana, India',
    exp: '0-2 Years',
    logo: 'https://logo.clearbit.com/cushmanwakefield.com'
  },
  {
    title: 'Management Trainee',
    company: 'INNOCEAN India',
    salary: '₹ 18,000 - 25,000 PM',
    location: 'Gurugram',
    exp: '0-6 months',
    logo: 'https://logo.clearbit.com/innocean.com'
  },
  {
    title: 'Business Analyst - Fresher',
    company: 'Toolyt',
    salary: '₹ 2,00,000 - 3,50,000 PA',
    location: 'Bengaluru, Karnataka, India',
    exp: '0-1 Year',
    logo: 'https://logo.clearbit.com/toolyt.com'
  },
  {
    title: 'Business Analyst - Gallagher',
    company: 'Gallagher',
    salary: '₹ 4,00,000 - 7,50,000 PA',
    location: 'Chandigarh, India',
    exp: '1-2 Years',
    logo: 'https://logo.clearbit.com/ajg.com'
  }
];

const JobOpeningPage = ({ setCurrentPage }) => {
  useReveal();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        height: 350, 
        background: 'linear-gradient(rgba(135, 116, 255, 0.4), rgba(255, 255, 255, 0.1)), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop") center/cover',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#333', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
          <span onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Job Opening</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginBottom: 40 }}>Job Opening</h1>

        {/* Filter Bar */}
        <div style={{ 
          display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
          padding: '0 24px'
        }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="dd-mm-yyyy"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ 
                padding: '12px 40px 12px 20px', borderRadius: 50, border: '1.5px solid #ddd',
                width: 180, fontSize: 14, background: '#fff'
              }}
            />
            <Calendar size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="dd-mm-yyyy"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ 
                padding: '12px 40px 12px 20px', borderRadius: 50, border: '1.5px solid #ddd',
                width: 180, fontSize: 14, background: '#fff'
              }}
            />
            <Calendar size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          </div>
          <button style={{ 
            background: '#c00', color: '#fff', border: 'none', padding: '12px 32px',
            borderRadius: 8, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
            cursor: 'pointer'
          }}>
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => { setFromDate(''); setToDate(''); }}
            style={{ 
              background: '#900', color: '#fff', border: 'none', padding: '12px 32px',
              borderRadius: 8, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </section>

      {/* Jobs Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="job-grid">
            {jobData.map((job, i) => (
              <div key={i} className="reveal job-card" 
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {/* Company Logo */}
                <div style={{ 
                  width: 140, height: 140, borderRadius: 8, background: '#001a4d',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, padding: 20
                }}>
                  <img src={job.logo} alt={job.company} style={{ maxWidth: '100%', maxHeight: '100%', filter: 'brightness(1)' }} 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=0D8ABC&color=fff`; }}
                  />
                </div>

                {/* Job Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#333', marginBottom: 4 }}>
                    {job.title}
                  </h3>
                  <div style={{ color: '#c00', fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>
                    {job.company}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 13 }}>
                      <IndianRupee size={14} /> <span>Salary : <span style={{ fontWeight: 600 }}>{job.salary}</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 13 }}>
                      <MapPin size={14} /> <span>Location : <span style={{ fontWeight: 600 }}>{job.location}</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 13 }}>
                      <Briefcase size={14} /> <span>Exp : <span style={{ fontWeight: 600 }}>{job.exp}</span></span>
                    </div>
                  </div>

                  <button style={{ 
                    marginTop: 16, background: 'none', border: 'none', color: '#333', 
                    fontSize: 13, fontWeight: 700, padding: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    Learn More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobOpeningPage;
