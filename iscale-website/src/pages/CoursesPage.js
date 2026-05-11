import React, { useState } from 'react';
import { ArrowRight, Star, Search } from 'lucide-react';

const allCourses = [
  { id: 1, category: 'AI Kickstart', tag: 'LIVE', title: 'AI Cohort Course - Batch 01', subtitle: 'Complete hands-on AI training', price: '₹4,999', original: '₹14,999', rating: 4.8, students: 2340, emoji: '🤖', color: '#1a1a2e', duration: '3 Months' },
  { id: 2, category: 'AI Kickstart', tag: 'APP + WEB', title: 'Complete AI Guide for Everyone', subtitle: 'From basics to advanced AI concepts', price: '₹2,999', original: '₹9,999', rating: 4.7, students: 1890, emoji: '💡', color: '#16213e', duration: '6 Weeks' },
  { id: 3, category: 'Data Science Courses', tag: 'POPULAR', title: 'Data Science Masters Program', subtitle: 'Excel, SQL, Python & Power BI', price: '₹5,999', original: '₹18,999', rating: 4.9, students: 5120, emoji: '📊', color: '#0f3460', duration: '4 Months' },
  { id: 4, category: 'Data Science Courses', tag: 'NEW', title: 'Business Analytics Complete', subtitle: 'Decision making with data', price: '₹3,499', original: '₹11,999', rating: 4.6, students: 980, emoji: '📈', color: '#533483', duration: '2 Months' },
  { id: 5, category: 'Data Science Courses', tag: 'BESTSELLER', title: 'Python for Data Analysis', subtitle: 'Pandas, NumPy & Matplotlib', price: '₹2,499', original: '₹7,999', rating: 4.8, students: 3200, emoji: '🐍', color: '#1a472a', duration: '6 Weeks' },
  { id: 6, category: 'Business Analytics', tag: 'LIVE', title: 'Power BI Masterclass', subtitle: 'Visual analytics & dashboards', price: '₹1,999', original: '₹6,999', rating: 4.7, students: 1540, emoji: '⚡', color: '#2c3e50', duration: '4 Weeks' },
  { id: 7, category: 'Business Analytics', tag: 'POPULAR', title: 'SQL for Data Analysts', subtitle: 'Queries, optimization & more', price: '₹1,499', original: '₹4,999', rating: 4.6, students: 2800, emoji: '🗃️', color: '#1a1a2e', duration: '3 Weeks' },
  { id: 9, category: 'Foundation Courses', tag: 'POPULAR', title: 'Machine Learning with Agentic AI', subtitle: 'Master ML and Agentic AI workflows', price: '₹8,999', original: '₹9,999', rating: 4.9, students: 453, emoji: '🧠', color: '#3d0000', duration: '4 Months' },
  { id: 10, category: 'Free Category', tag: 'FREE', title: 'Free Data Science Course', subtitle: 'Learn Statistics, ML & Analysis', price: 'FREE', original: '₹9,999', rating: 4.8, students: 45739, emoji: '📉', color: '#1a1a2e', duration: '100 Days' },
  { id: 11, category: 'Free Category', tag: 'FREE', title: 'Free Data Analytics Course', subtitle: 'Power BI, SQL & Excel', price: 'FREE', original: '₹7,999', rating: 4.7, students: 337047, emoji: '📊', color: '#16213e', duration: '45 Days' },
];

const categories = ['All', 'AI Kickstart', 'Data Science Courses', 'Business Analytics', 'Foundation Courses', 'Free Category'];

const CoursesPage = ({ setCurrentPage, onCourseSelect }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allCourses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '80vh', background: '#f9f9fb' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #3d0000 100%)', color: '#fff', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginBottom: 12 }}>
            Explore Our <span style={{ color: '#ff6b6b' }}>Courses</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, marginBottom: 32 }}>
            Industry-aligned courses designed by experts for your career growth
          </p>

          <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 14px 14px 48px',
                borderRadius: 12, border: 'none', fontSize: 15,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px', borderRadius: 100,
                border: `2px solid ${activeCategory === cat ? 'var(--red)' : '#ddd'}`,
                background: activeCategory === cat ? 'var(--red)' : '#fff',
                color: activeCategory === cat ? '#fff' : '#555',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {filtered.map(course => (
            <div 
              key={course.id} 
              onClick={() => onCourseSelect(course.title)}
              style={{
                borderRadius: 16, overflow: 'hidden', background: '#fff',
                boxShadow: 'var(--shadow-card)', transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
            >
              <div style={{
                background: course.color, height: 180,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', padding: 20
              }}>
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: course.tag === 'LIVE' ? '#e50000' : '#333',
                  color: '#fff', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700
                }}>
                  {course.tag === 'LIVE' ? '🔴 LIVE' : course.tag}
                </span>
                <div style={{ fontSize: 72 }}>{course.emoji}</div>
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>{course.category}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 6, lineHeight: 1.3 }}>{course.title}</h3>
                <p style={{ color: '#888', fontSize: 13, marginBottom: 12 }}>{course.subtitle}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--red)' }}>{course.price}</span>
                    <span style={{ color: '#bbb', fontSize: 13, textDecoration: 'line-through', marginLeft: 8 }}>{course.original}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentPage('login'); }}
                    style={{
                      padding: '8px 16px', background: 'var(--red)', color: '#fff',
                      borderRadius: 8, fontWeight: 600, fontSize: 12,
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                      transition: 'background 0.2s'
                    }}
                  >
                    Enroll <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
