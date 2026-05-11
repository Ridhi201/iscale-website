import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

const OtpVerificationPage = ({ email, setCurrentPage, onLoginSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (value, idx) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    if (value && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const prev = document.getElementById(`otp-${idx - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid OTP. Please try again.');
        setLoading(false);
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem('iscale_token', data.token);
      localStorage.setItem('iscale_user', JSON.stringify(data.user));
      if (onLoginSuccess) onLoginSuccess(data.user);
      setCurrentPage('dashboard');
    } catch (err) {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('OTP resent! Please check your Gmail inbox.');
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch {
      setError('Could not connect to server.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth < 991 ? 'column' : 'row',
        maxWidth: '1000px',
        width: '100%',
        background: 'transparent',
        alignItems: 'center',
        gap: window.innerWidth < 991 ? '20px' : '40px'
      }}>
        {/* Left illustration */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <img 
              src="https://img.freepik.com/free-vector/otp-concept-illustration_114360-7917.jpg" 
              alt="OTP Illustration" 
              style={{ width: '100%', borderRadius: '20px' }}
            />
            {/* Overlay simulation of the screenshot illustration */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <div style={{
                  background: '#fff', borderRadius: '16px', padding: '20px', width: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center'
               }}>
                  <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '10px' }}>JOIN US</div>
                  <div style={{ color: '#888', fontSize: '10px', marginBottom: '15px' }}>IT'S FREE!</div>
                  <div style={{ height: '25px', background: '#f5f5f5', borderRadius: '5px', marginBottom: '8px' }}></div>
                  <div style={{ height: '25px', background: '#f5f5f5', borderRadius: '5px', marginBottom: '15px' }}></div>
                  <button style={{ width: '100%', padding: '8px', background: '#900', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>SIGN UP</button>
               </div>
            </div>
          </div>
        </div>

        {/* Right OTP panel */}
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: '12px',
          padding: '50px 40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          maxWidth: '500px'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '800', marginBottom: '15px', color: '#001d3d' }}>
            OTP Verification
          </h2>
          <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.5', marginBottom: '40px' }}>
            Please enter the one time password<br />sent to <b>{email}</b>
          </p>

          {/* OTP Boxes */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                style={{
                  width: window.innerWidth < 500 ? '40px' : '50px',
                  height: window.innerWidth < 500 ? '50px' : '60px',
                  textAlign: 'center',
                  fontSize: window.innerWidth < 500 ? '20px' : '24px',
                  fontWeight: '400',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  outline: 'none',
                  color: '#333',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            ))}
          </div>

          {error && (
            <div style={{ color: 'var(--red)', fontSize: '14px', marginBottom: '20px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: '#00aa44', fontSize: '14px', marginBottom: '20px' }}>
              {success}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: '#900',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading
              ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              : <>Verify OTP <ArrowRight size={20} /></>
            }
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleResend}
              disabled={resending}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '14px',
                cursor: resending ? 'not-allowed' : 'pointer',
                fontWeight: '500'
              }}
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
