import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';

const RegisterPage = ({ setCurrentPage, onRegisterSuccess }) => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', contact: '',
    whatsapp: '', gender: 'male', sameWA: false, agreed: false,
    password: '', confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const { firstName, lastName, email, contact, whatsapp, agreed, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !contact || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.sameWA && !whatsapp) {
      setError('Please enter your WhatsApp number.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the privacy policy and terms of service.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email,
          contact, whatsapp: form.sameWA ? contact : whatsapp,
          gender: form.gender, password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      // Move to OTP verification, pass the email
      if (onRegisterSuccess) onRegisterSuccess(email);
      setCurrentPage('otp-verification');
    } catch (err) {
      setError('Could not connect to server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '60px 0' }}>
      <div className="container about-grid">
        {/* Illustration */}
        <div style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
          <div style={{
            width: 320, height: 380, margin: '0 auto',
            background: 'linear-gradient(135deg, #ffe5e5, #ffd0d0)',
            borderRadius: 24, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', width: 240, height: 240,
              background: 'rgba(192,0,12,0.1)', borderRadius: '50%',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
            }} />
            <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 32 }}>✉️</div>
            <div style={{ position: 'absolute', top: 20, right: 40, fontSize: 28 }}>✉️</div>
            <div style={{ position: 'absolute', bottom: 40, left: 30, fontSize: 24 }}>✉️</div>

            <div style={{
              background: '#fff', borderRadius: 16, padding: 24, width: 200,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, textAlign: 'center', marginBottom: 16 }}>JOIN US</div>
              <div style={{ color: '#888', fontSize: 11, textAlign: 'center', marginBottom: 16 }}>IT'S FREE!</div>
              <div style={{ background: '#f0f0f0', borderRadius: 6, padding: '8px', marginBottom: 8, fontSize: 11, color: '#aaa' }}>USERNAME</div>
              <div style={{ background: '#f0f0f0', borderRadius: 6, padding: '8px', marginBottom: 16, fontSize: 11, color: '#aaa' }}>PASSWORD</div>
              <button style={{ width: '100%', padding: '10px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 13, border: 'none' }}>
                SIGN UP
              </button>
            </div>

            <div style={{
              position: 'absolute', top: 100, right: 20,
              width: 48, height: 48, background: '#222', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Check size={24} color="#fff" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 20, fontSize: 80 }}>👩‍💼</div>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: 40,
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          animation: 'fadeUp 0.6s ease forwards'
        }}>
          <div style={{ marginBottom: 24 }}>
            <img 
              src="https://theiscale.com/assets/images/logo.png" 
              alt="iScale Logo" 
              style={{ height: 40, objectFit: 'contain' }} 
              onError={(e) => { e.target.src = "https://theiscale.com/assets/images/logo-icon.png"; }}
            />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Register</h1>

          {error && (
            <div style={{ background: '#fff0f0', color: 'var(--red)', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20, border: '1px solid #ffd0d0' }}>
              {error}
            </div>
          )}

          <div className="form-grid" style={{ marginBottom: 16 }}>
            {[['First Name *', 'firstName'], ['Last Name *', 'lastName']].map(([label, key]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
            ))}
          </div>

          {[
            ['Email address *', 'email', 'email'],
            ['Contact Number *', 'contact', 'tel'],
          ].map(([label, key, type]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 10 }}>
              <input type="checkbox" checked={form.sameWA} onChange={e => setForm({ ...form, sameWA: e.target.checked })} style={{ accentColor: 'var(--red)' }} />
              Same as my Whatsapp Number
            </label>
            {!form.sameWA && (
              <>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Whatsapp Number *</label>
                <input
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                />
              </>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 8 }}>Gender *</label>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Male', 'Female', 'Others'].map(g => (
                <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                  <input type="radio" name="reg-gender" value={g.toLowerCase()}
                    checked={form.gender === g.toLowerCase()}
                    onChange={() => setForm({ ...form, gender: g.toLowerCase() })}
                    style={{ accentColor: 'var(--red)' }} />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 6 characters"
                style={{ width: '100%', padding: '10px 32px 10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Confirm Password *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Re-enter your password"
              style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
              onFocus={e => e.target.style.borderColor = 'var(--red)'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#777', cursor: 'pointer', marginBottom: 24 }}>
            <input type="checkbox" checked={form.agreed} onChange={e => setForm({ ...form, agreed: e.target.checked })} style={{ accentColor: 'var(--red)' }} />
            I agree to the <span style={{ color: 'var(--red)', fontWeight: 600 }}>privacy policy</span> and <span style={{ color: 'var(--red)', fontWeight: 600 }}>terms of service</span>.
          </label>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, var(--red), var(--red-dark))',
              color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 4px 20px rgba(192,0,12,0.35)',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
            }}
          >
            {loading
              ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              : <>Register <ArrowRight size={18} /></>
            }
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#777' }}>
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
