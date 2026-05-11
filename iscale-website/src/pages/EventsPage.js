import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Users } from 'lucide-react';

const eventsData = [
  {
    id: 1, type: 'FREE', title: 'AI for Beginners - Live Webinar',
    date: 'June 15, 2025', time: '6:00 PM - 8:00 PM IST',
    mode: 'Online', host: 'Rahil Gupta - CTO, Hop Electric',
    seats: 200, registered: 145,
    description: 'Join our free live webinar where industry experts will explain AI fundamentals and how to kickstart your AI journey.',
    color: '#1a1a2e', emoji: '🤖'
  },
  {
    id: 2, type: 'PAID', title: 'Data Science Bootcamp - Intensive',
    date: 'June 20-22, 2025', time: '10:00 AM - 6:00 PM IST',
    mode: 'Online', host: 'iScale Expert Team',
    seats: 50, registered: 38,
    description: '3-day intensive bootcamp covering the complete data science pipeline with real project work.',
    color: '#0f3460', emoji: '📊'
  },
  {
    id: 3, type: 'FREE', title: 'Career Counselling Session',
    date: 'June 18, 2025', time: '7:00 PM - 8:30 PM IST',
    mode: 'Online', host: 'Prasad Menon - CHRO, Amagi',
    seats: 100, registered: 87,
    description: 'Get personalized career guidance from industry CHROs and learn what top companies look for.',
    color: '#533483', emoji: '🎯'
  },
  {
    id: 4, type: 'FREE', title: 'Python Workshop for Beginners',
    date: 'June 25, 2025', time: '5:00 PM - 7:00 PM IST',
    mode: 'Online', host: 'iScale Data Science Team',
    seats: 150, registered: 92,
    description: 'Zero to hero Python session. No prior coding experience required. Come with curiosity!',
    color: '#1a472a', emoji: '🐍'
  },
];

const EventsPage = () => {
  const [filter, setFilter] = useState('All');
  const [registeredIds, setRegisteredIds] = useState([]);

  const filtered = filter === 'All' ? eventsData : eventsData.filter(e => e.type === filter);

  const handleRegister = (event) => {
    if (registeredIds.includes(event.id)) return;
    setRegisteredIds([...registeredIds, event.id]);
    alert(`Successfully registered for "${event.title}"! You will receive details on your email. (Frontend demo)`);
  };

  return (
    <div style={{ minHeight: '80vh', background: '#f9f9fb' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)', color: '#fff', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>UPCOMING</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginTop: 12, marginBottom: 12 }}>
            Events & <span style={{ color: '#ff6b6b' }}>Webinars</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>
            Learn from industry leaders. Join our free and paid events.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {['All', 'FREE', 'PAID'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '10px 24px', borderRadius: 100,
              border: `2px solid ${filter === f ? 'var(--red)' : '#ddd'}`,
              background: filter === f ? 'var(--red)' : '#fff',
              color: filter === f ? '#fff' : '#555',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
            }}>
              {f === 'All' ? 'All Events' : f === 'FREE' ? '🎁 Free Events' : '💎 Paid Events'}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map(event => (
            <div key={event.id} className="event-row-grid" style={{
              background: '#fff', borderRadius: 20, overflow: 'hidden',
              boxShadow: 'var(--shadow-card)', transition: 'box-shadow 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
            >
              {/* Left colorful panel */}
              <div style={{
                background: event.color,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 24, gap: 12
              }}>
                <div style={{ fontSize: 48 }}>{event.emoji}</div>
                <span style={{
                  background: event.type === 'FREE' ? '#00c851' : '#ff6600',
                  color: '#fff', padding: '4px 14px', borderRadius: 100,
                  fontSize: 13, fontWeight: 800
                }}>
                  {event.type}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: 28 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{event.title}</h3>
                <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{event.description}</p>

                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {[
                    [<Calendar size={14} />, event.date],
                    [<Clock size={14} />, event.time],
                    [<MapPin size={14} />, event.mode],
                    [<Users size={14} />, `${event.registered}/${event.seats} registered`],
                  ].map(([icon, text], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#666' }}>
                      <span style={{ color: 'var(--red)' }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
                  🎙️ <strong>{event.host}</strong>
                </div>

                {/* Seats progress bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginBottom: 4 }}>
                    <span>Seats filling fast</span>
                    <span>{event.seats - event.registered} seats left</span>
                  </div>
                  <div style={{ height: 6, background: '#eee', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(event.registered / event.seats) * 100}%`,
                      background: 'linear-gradient(90deg, var(--red), #ff6b6b)',
                      borderRadius: 100, transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
              </div>

              {/* Register button area */}
              <div style={{ padding: 28, display: 'flex', alignItems: 'center', borderLeft: '1px solid #f0f0f0' }}>
                <button
                  onClick={() => handleRegister(event)}
                  style={{
                    padding: '12px 24px',
                    background: registeredIds.includes(event.id)
                      ? '#e8fff0' : 'linear-gradient(135deg, var(--red), var(--red-dark))',
                    color: registeredIds.includes(event.id) ? '#00aa44' : '#fff',
                    borderRadius: 12, fontWeight: 700, fontSize: 14,
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    whiteSpace: 'nowrap', transition: 'all 0.3s',
                    boxShadow: registeredIds.includes(event.id) ? 'none' : '0 4px 16px rgba(192,0,12,0.3)'
                  }}
                >
                  {registeredIds.includes(event.id) ? '✓ Registered' : <>Register Now <ArrowRight size={14} /></>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
