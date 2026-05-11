import React, { useState } from 'react';
import { Search, RotateCcw, Play, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const storyData = [
  { name: 'Mr. Roshan Baghwar', company: 'SWIGGY', package: '30 LPA', videoId: 'SfJg2du-ALY' },
  { name: 'Ms. Poonam Kalamkar', company: 'Microsoft', package: '21 LPA', videoId: 'Akc6JJH8lwo' }, // Reusing another if missing, but I'll check the list
  { name: 'Venus', company: 'Maersk', package: '14.5 LPA', videoId: 'd-mpauGxxBg' },
  { name: 'Ankush', company: 'Tiger Analytics', package: '14 LPA', videoId: 'pVz7InS29Qw' },
  { name: 'Ms. Jahnavi Angati', company: 'IBM', package: '12 LPA', videoId: '-x-AiOHs0HU' },
  { name: 'Siya', company: 'Caterpillar', package: '9.8 LPA', videoId: 'vwfwW_xlrYc' },
  { name: 'Shreya', company: 'Deloitte', package: '7.6 LPA', videoId: 'Akc6JJH8lwo' },
  { name: 'Bhoopendra', company: 'HDFC Bank', package: '7 LPA', videoId: 'Dkn02GfZXNs' },
  { name: 'Manas Jyoti Borah', company: 'The GoodGlamm', package: 'N/A', videoId: 'Akc6JJH8lwo' },
  { name: 'Aditya Singh', company: 'Network Zone', package: 'Non-disclosed', videoId: 't5lPpOPgxvs' },
  { name: 'Amit Jaiswal', company: 'INFOCRATS', package: 'Non-disclosed', videoId: 'gtms_G5MLrs' },
  { name: 'Shubham', company: 'Data Cult', package: 'N/A', videoId: 'LIzTbS9-x_w' },
  { name: 'Mr. Aman Dewangan', company: 'Accenture', package: 'N/A', videoId: 'vwfwW_xlrYc' },
  { name: 'Suryakant', company: 'iScale', package: 'N/A', videoId: '7VRhjPYJjZI' },
];

const SuccessStoryPage = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  useReveal();

  const filteredStories = storyData.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="section-padding" style={{ 
        minHeight: 350, 
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop") center/cover',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#fff', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 800, marginBottom: 12, padding: '0 20px' }}>Success Stories</h1>
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          <span onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ margin: '0 10px' }}>›</span>
          <span>Success Stories</span>
        </div>

        {/* Search Bar */}
        <div style={{ 
          marginTop: 40, background: '#fff', padding: '12px', borderRadius: 24, 
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, width: '90%', maxWidth: 700,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <input 
            placeholder="Search Your Candidate Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: '1 1 200px', border: 'none', padding: '8px 12px', fontSize: 15, color: '#333',
              background: 'transparent'
            }} 
          />
          <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'flex-end', flex: '1 1 auto' }} className="desktop-flex-initial">
            <button style={{ 
              background: 'var(--red)', color: '#fff', border: 'none', 
              width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Search size={20} />
            </button>
            <button 
              onClick={() => setSearchTerm('')}
              style={{ 
                background: '#000', color: '#fff', border: 'none', padding: '0 20px',
                height: 44, borderRadius: 50, fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap'
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 24 
          }}>
            {filteredStories.map((story, i) => (
              <div key={i} className="reveal" style={{ 
                background: '#fff', borderRadius: 16, overflow: 'hidden', 
                boxShadow: 'var(--shadow-card)', border: '1px solid #eee'
              }}>
                {/* Video Container */}
                <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    src={`https://www.youtube.com/embed/${story.videoId}?rel=0`}
                    title={story.name}
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Content */}
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{story.name}</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ 
                      width: 32, height: 32, borderRadius: '50%', background: 'var(--red)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 800 }}>i</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#777' }}>Placed at:</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{story.company}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ 
                      width: 32, height: 32, borderRadius: '50%', background: '#f0f0f0', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <span style={{ fontSize: 16 }}>💰</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#777' }}>Package:-</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--red)' }}>{story.package}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryPage;
