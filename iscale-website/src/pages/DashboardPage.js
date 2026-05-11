import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, User, BookOpen, BookMarked,
  Calendar, BarChart2, Settings, LogOut, Menu, X, Monitor
} from 'lucide-react';

const API_BASE = 'http://localhost:5000';

const Sidebar = ({ active, setActive, setCurrentPage, onLogout, isOpen, setIsOpen, isTablet }) => {
  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'profile', label: 'My Profile', icon: <User size={16} /> },
    { id: 'explore', label: 'Explore Courses', icon: <BookOpen size={16} /> },
    { id: 'enrolled', label: 'Enrolled Courses', icon: <BookMarked size={16} /> },
    { id: 'events', label: 'Enrolled Events', icon: <Calendar size={16} /> },
    { id: 'results', label: 'Test Series Result', icon: <BarChart2 size={16} /> },
  ];

  const userItems = [
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
    { id: 'logout', label: 'Logout', icon: <LogOut size={16} />, danger: true },
  ];

  const handleClick = (id) => {
    if (id === 'logout') { onLogout(); return; }
    if (id === 'explore') { setCurrentPage('courses'); return; }
    setActive(id);
    if (isTablet) setIsOpen(false);
  };

  const Item = ({ item }) => (
    <button
      onClick={() => handleClick(item.id)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', borderRadius: 8, border: 'none',
        background: active === item.id ? '#fff5f5' : 'transparent',
        color: item.danger ? '#e53e3e' : active === item.id ? 'var(--red)' : '#555',
        fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: active === item.id ? 600 : 400,
        cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
        borderLeft: active === item.id ? '3px solid var(--red)' : '3px solid transparent',
      }}
    >
      <span style={{ color: item.danger ? '#e53e3e' : active === item.id ? 'var(--red)' : '#888' }}>
        {item.icon}
      </span>
      {item.label}
    </button>
  );

  const sidebarStyle = {
    width: 260, flexShrink: 0,
    background: '#fff', borderRadius: isTablet ? 0 : 12,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    border: '1px solid #eee', padding: '16px 8px',
    position: isTablet ? 'fixed' : 'sticky',
    top: 0,
    left: isOpen ? 0 : -260,
    height: isTablet ? '100vh' : 'auto',
    zIndex: 2000,
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowY: 'auto'
  };

  return (
    <>
      {isTablet && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1999 }} 
        />
      )}
      <div style={sidebarStyle}>
        {isTablet && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px 16px' }}>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
          </div>
        )}
        <div style={{ padding: '0 16px 20px' }}>
            <div style={{ fontWeight: 800, color: '#900', fontSize: 20 }}>iSCALE</div>
            <div style={{ fontSize: 11, color: '#888' }}>Student Dashboard</div>
        </div>
        {mainItems.map(item => <Item key={item.id} item={item} />)}
        <div style={{ borderTop: '1px solid #eee', margin: '12px 8px', paddingTop: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', padding: '4px 16px 8px', textTransform: 'uppercase', letterSpacing: 1 }}>USER</div>
          {userItems.map(item => <Item key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
};

const DashboardHome = ({ user }) => (
  <div style={{ animation: 'fadeUp 0.5s ease forwards' }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 700, marginBottom: 24, color: '#000' }}>Dashboard</h2>
    <div style={{
      background: '#fff', borderRadius: 12, padding: '24px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', marginBottom: 24,
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap'
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: '50%',
        border: '2px solid #900', padding: '2px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
      }}>
        <img 
          src="https://theiscale.com/assets/images/logo.png" 
          alt="iScale Logo" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => { e.target.src = "https://theiscale.com/assets/images/logo-icon.png"; }}
        />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#000' }}>
          Welcome, {user?.firstName}!
        </div>
        <div style={{ color: '#666', fontSize: 14 }}>Ready to continue your learning journey?</div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
      {[
        { label: 'PREMIUM COURSES', count: user?.enrolledCourses?.length || 0, color: '#ebf2ff', iconColor: '#4361ee', icon: <BookOpen size={28} /> },
        { label: 'FREE COURSES', count: 0, color: '#fcf0ff', iconColor: '#9c27b0', icon: <Monitor size={28} /> },
      ].map(card => (
        <div key={card.label} style={{
          background: card.color, borderRadius: 16, padding: '32px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, border: '1px dashed rgba(0,0,0,0.05)'
        }}>
          <div style={{ background: '#fff', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.iconColor, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            {card.icon}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: '#900' }}>{card.count}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#666', letterSpacing: 0.5 }}>{card.label}</div>
        </div>
      ))}
    </div>
  </div>
);



const ProfileView = ({ user, onUpdate, isMobile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [saving, setSaving] = useState(false);

  const fields = [
    { label: 'Registration Date', key: 'createdAt', readonly: true },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Parent Name', key: 'parentName' },
    { label: 'Mobile Number', key: 'contact', readonly: true },
    { label: 'Alt Mobile Number', key: 'altContact' },
    { label: 'Whatsapp Number', key: 'whatsapp' },
    { label: 'Email', key: 'email', readonly: true },
    { label: 'Dob', key: 'dob' },
    { label: 'Gender', key: 'gender' },
    { label: 'State', key: 'state' },
    { label: 'City', key: 'city' },
    { label: 'Pincode', key: 'pincode' },
    { label: 'Address', key: 'address' },
    { label: 'Skill/Occupation', key: 'skill' },
    { label: 'Biography', key: 'biography' },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('iscale_token')}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) { onUpdate(data.user); setIsEditing(false); }
    } finally { setSaving(false); }
  };

  return (
    <div style={{ animation: 'fadeUp 0.5s ease forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, margin: 0 }}>My Profile</h2>
        <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} style={{ padding: '8px 20px', background: isEditing ? '#0a4' : '#900', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
          {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: isMobile ? '24px' : '40px', boxShadow: '0 2px 20px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          {fields.map(f => (
            <div key={f.key} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: '12px 0', borderBottom: '1px solid #f8f8f8', gap: isMobile ? 4 : 20 }}>
              <div style={{ minWidth: 180, color: '#666', fontSize: 14 }}>{f.label}</div>
              {isEditing && !f.readonly ? (
                <input type="text" value={formData[f.key] || ''} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} style={{ flex: 1, padding: '6px 10px', borderRadius: 4, border: '1px solid #ddd' }} />
              ) : (
                <div style={{ fontWeight: 500, fontSize: 15 }}>{user?.[f.key] || '—'}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EnrolledCourses = () => <div style={{ padding: 40, textAlign: 'center', background: '#fff', borderRadius: 12 }}>No courses enrolled yet.</div>;
const EnrolledEvents = () => <div style={{ padding: 40, textAlign: 'center', background: '#fff', borderRadius: 12 }}>No events found.</div>;
const TestResults = () => <div style={{ padding: 40, textAlign: 'center', background: '#fff', borderRadius: 12 }}>No test series result.</div>;
const SettingsView = ({ user }) => <div style={{ padding: 40, background: '#fff', borderRadius: 12 }}>Settings for {user?.firstName}</div>;

const DashboardPage = ({ setCurrentPage }) => {
  const [active, setActive] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 991);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('iscale_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const onLogout = () => {
    localStorage.removeItem('iscale_token');
    localStorage.removeItem('iscale_user');
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (active) {
      case 'dashboard': return <DashboardHome user={user} />;
      case 'profile': return <ProfileView user={user} onUpdate={setUser} isMobile={isMobile} />;
      case 'enrolled': return <EnrolledCourses />;
      case 'events': return <EnrolledEvents />;
      case 'results': return <TestResults />;
      case 'settings': return <SettingsView user={user} />;
      default: return <DashboardHome user={user} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', flexDirection: 'column' }}>
      {/* Mobile Top Bar */}
      <div className="mobile-only" style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ fontWeight: 800, color: '#900' }}>iSCALE</div>
        <button onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none' }}><Menu size={24} /></button>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: isTablet ? 0 : '40px 24px', gap: 30, maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <Sidebar active={active} setActive={setActive} onLogout={onLogout} setCurrentPage={setCurrentPage} isOpen={isOpen} setIsOpen={setIsOpen} isTablet={isTablet} />
        <main style={{ flex: 1, minWidth: 0, padding: isTablet ? '24px' : 0 }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
