import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const speakerData = [
  { name: 'Ashay Krishna', title: 'Director of Engg', company: 'Microsoft', logo: 'https://www.theiscale.com/myadmin/uploads/more/Logo-microsoft-transparent-background-PNG-removebg-preview.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Untitled-1.png', videoUrl: 'https://youtu.be/hDm1e5i2DqA' },
  { name: 'Shweta Shandilya', title: 'Executive Director', company: 'IBM', logo: 'https://www.theiscale.com/myadmin/uploads/more/ibm.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Shweta_Shandilya_small1.png', videoUrl: 'https://youtu.be/xksTGfO7WII' },
  { name: 'Mr. Uday Narang', title: 'Chairman', company: 'OSM', logo: 'https://www.theiscale.com/myadmin/uploads/more/osm.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Uday_Narang_osm.png', videoUrl: 'https://youtu.be/m62w5xf6TO4' },
  { name: 'Prasad Menon', title: 'CHRO', company: 'Amagi', logo: 'https://www.theiscale.com/myadmin/uploads/more/amagi1.png', image: 'https://www.theiscale.com/myadmin/uploads/more/prasad_menon.png', videoUrl: 'https://youtu.be/hTT9LkdBmsY' },
  { name: 'Mr Jaibir Siwach', title: 'CEO & Founder', company: 'Kabira Mobility', logo: 'https://www.theiscale.com/myadmin/uploads/more/kabira.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Jaibir_Siwach_small1.png', videoUrl: 'https://youtu.be/iBIcCGpSpeM' },
  { name: 'Harjeet Khanduja', title: 'Vice President', company: 'Reliance Jio', logo: 'https://www.theiscale.com/myadmin/uploads/more/reliance_jio.png', image: 'https://www.theiscale.com/myadmin/uploads/more/sardar_ji.png', videoUrl: 'https://youtu.be/eMLOufATomo' },
  { name: 'Mr Rahil Gupta', title: 'Co-founder and CTO', company: 'Hop Electric Vehicle', logo: 'https://www.theiscale.com/myadmin/uploads/more/hop_logo.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Rahil_Hop_small1.png', videoUrl: 'https://youtu.be/K8ZzPq1EjM8' },
  { name: 'Mr. Dhiraj Shetty', title: 'Sr. G.M. - HR & Operations', company: 'Ultraviolette Automotive', logo: 'https://www.theiscale.com/myadmin/uploads/more/Uktravoillette_logo.png', image: 'https://www.theiscale.com/myadmin/uploads/more/Dhirajshetty_ultravoillette.png', videoUrl: 'https://youtu.be/T3rqWq7Dqr0' }
];

const PlacementTalksPage = ({ setCurrentPage }) => {
  useReveal();

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        height: 350, 
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop") center/cover',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#fff', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, marginBottom: 12 }}>Pre-Placement Talks</h1>
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          <span onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ margin: '0 10px' }}>›</span>
          <span>Pre-Placement Talks</span>
        </div>
      </section>

      {/* Intro Title */}
      <div style={{ textAlign: 'center', padding: '60px 24px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>
          Pre Placement <span style={{ color: 'var(--red)' }}>Talks</span> with the <span style={{ color: 'var(--red)' }}>Company's</span> HR
        </h2>
      </div>

      {/* Speakers Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 32 
          }}>
            {speakerData.map((speaker, i) => (
              <div key={i} className="reveal" style={{ 
                background: '#fff', borderRadius: 20, padding: '40px 24px', 
                textAlign: 'center', boxShadow: 'var(--shadow-card)',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}>
                {/* Profile Image */}
                <div style={{ 
                  width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', 
                  marginBottom: 20, border: '4px solid #f8f9fa'
                }}>
                  <img src={speaker.image} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{speaker.name}</h3>
                <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>{speaker.title}</p>

                {/* Double Chevron */}
                <div style={{ color: '#40c4ff', marginBottom: 20 }}>
                  <ChevronDown size={24} strokeWidth={3} />
                  <ChevronDown size={24} strokeWidth={3} style={{ marginTop: -16 }} />
                </div>

                {/* Company Logo */}
                <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <img src={speaker.logo} alt={speaker.company} style={{ maxHeight: '100%', maxWidth: 120 }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 24 }}>{speaker.company}</div>

                <button 
                  onClick={() => window.open(speaker.videoUrl, '_blank')}
                  style={{ 
                  background: 'var(--red)', color: '#fff', border: 'none', 
                  padding: '10px 28px', borderRadius: 50, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementTalksPage;
