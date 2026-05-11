import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage, { SuccessStories } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import EventsPage from './pages/EventsPage';
import SuccessStoryPage from './pages/SuccessStoryPage';
import JobOpeningPage from './pages/JobOpeningPage';
import PlacementTalksPage from './pages/PlacementTalksPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import DashboardPage from './pages/DashboardPage';
import CourseDetailPage from './pages/CourseDetailPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [otpEmail, setOtpEmail] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('Advance Python with AI Tools');
  // On mount, check for existing JWT token to restore session
  useEffect(() => {
    const token = localStorage.getItem('iscale_token');
    const user = localStorage.getItem('iscale_user');
    if (token && user) {
      try {
        setLoggedInUser(JSON.parse(user));
      } catch (e) {
        localStorage.removeItem('iscale_token');
        localStorage.removeItem('iscale_user');
      }
    }
  }, []);

  const handleLoginSuccess = (user, emailForOtp) => {
    if (user) {
      setLoggedInUser(user);
    }
    if (emailForOtp) {
      setOtpEmail(emailForOtp);
    }
  };

  const handleRegisterSuccess = (email) => {
    setOtpEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('iscale_token');
    localStorage.removeItem('iscale_user');
    setLoggedInUser(null);
    setCurrentPage('home');
  };

  const handleCourseSelect = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setCurrentPage('course-detail');
  };

  // Pages that should hide the Navbar/Footer
  const fullscreenPages = ['dashboard'];
  const isFullscreen = fullscreenPages.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} onCourseSelect={handleCourseSelect} />;
      case 'login': return <LoginPage setCurrentPage={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'register': return <RegisterPage setCurrentPage={setCurrentPage} onRegisterSuccess={handleRegisterSuccess} />;
      case 'otp-verification': return <OtpVerificationPage email={otpEmail} setCurrentPage={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard': return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'courses':
      case 'explore-courses': return <CoursesPage setCurrentPage={setCurrentPage} onCourseSelect={handleCourseSelect} />;
      case 'events': return <EventsPage />;
      case 'success-story': return <SuccessStoryPage setCurrentPage={setCurrentPage} />;
      case 'job-updates': return <JobOpeningPage setCurrentPage={setCurrentPage} />;
      case 'placement-talks': return <PlacementTalksPage setCurrentPage={setCurrentPage} />;
      case 'course-detail': return <CourseDetailPage setCurrentPage={setCurrentPage} selectedCourse={selectedCourse} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  if (isFullscreen) {
    return (
      <div style={{ minHeight: '100vh' }}>
        {/* Minimal top bar for dashboard */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #eee',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            onClick={() => setCurrentPage('home')}
          >
            <div style={{
              width: 36, height: 36, background: 'var(--red)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>i</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: 'var(--red)' }}>i</span>SCALE
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#555' }}>
              👤 {loggedInUser?.firstName || 'User'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '7px 16px', background: 'var(--red)', color: '#fff',
                borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {renderPage()}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        loggedInUser={loggedInUser} 
        onLogout={handleLogout} 
        onCourseSelect={handleCourseSelect}
      />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
