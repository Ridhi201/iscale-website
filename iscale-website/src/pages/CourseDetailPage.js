import React, { useState, useEffect } from 'react';
import { Play, Download, Star, Clock, Globe, ChevronRight, CheckCircle, ChevronDown, ShoppingCart, Users, X, ArrowRight, Github, FileText, Database, BarChart } from 'lucide-react';

const CurriculumItem = ({ item, idx, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
      style={{ 
        borderBottom: isLast ? 'none' : '1px solid #eee',
        background: isExpanded ? '#fff' : (idx % 2 === 0 ? '#fff' : '#fafafa'),
      }}
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ 
          padding: '16px 24px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <CheckCircle size={18} color="#4caf50" />
          <span style={{ fontSize: 15, fontWeight: isExpanded ? 600 : 500, color: '#333' }}>
            {item.title}
          </span>
        </div>
        <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </div>
      {isExpanded && (
        <div style={{ padding: '0 24px 20px 58px', color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {item.lessons.map((lesson, i) => (
              <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Play size={12} color="var(--red)" /> {lesson}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const defaultDetails = [
  "Intensive Program: A meticulously designed curriculum to master high-demand skills quickly.",
  "Live Expert-Led Sessions: Includes exclusive live sessions with industry mentors for real-time guidance.",
  "Industry-Recognized Certification: Earn an ISO-certified certificate upon completion.",
  "Extended Learning Access: Access to recorded materials to solidify concepts at your own pace.",
  "Practical Curriculum: Focuses on foundational principles and advanced applications through hands-on projects.",
  "High Value: Professional-grade upskilling at an accessible fee."
];

const defaultHighlights = [
  "Course Completion Certificate", "Expert-led Lectures", 
  "Workflow Automation", "Live Zoom Sessions", 
  "Case Studies Provided", "Downloadable Notes", 
  "Hands-on Projects", "Industry Oriented"
];

const defaultFaqs = [
  { q: "Is this course suitable for beginners?", a: "Yes, this course is designed specifically for everyone—whether you are a college student, a freelancer, or a working professional. We start from the basics and move to advanced concepts." },
  { q: "Will I get a certificate after completion?", a: "Yes, upon successful completion of the course, you will receive an ISO-certified certificate from The iScale, which is recognized by leading industries." },
  { q: "In which mode and medium the course are available?", a: "The course is available in online mode with recorded lectures and 6 exclusive live sessions on Zoom for doubt clearing and mentorship." },
  { q: "What is the duration of the course?", a: "The program is an intensive 45-day fast-track course featuring over 30 comprehensive lectures." }
];

const coursesDetails = {
  'Advance Python with AI Tools': {
    category: 'Foundation Courses',
    title: 'Advance Python with AI Tools',
    description: 'Master the core of modern technology with our Advanced Python course, specifically designed for those looking to bridge the gap between coding and professional-grade AI implementation.',
    views: '28574',
    updated: '18 Apr,2026',
    language: 'Hinglish',
    price: '₹699',
    original: '₹999',
    curriculum: [
      { title: 'Module 1: The Basic of Python Programming', lessons: ['Introduction to Python', 'Environment Setup', 'Hello World Program'] },
      { title: 'Module 2: Variables & Operators in Python', lessons: ['Data Types', 'Arithmetic Operators', 'Logical Operators'] },
      { title: 'Module 3: Build in Function of Python', lessons: ['Print()', 'Input()', 'Type()', 'Len()'] },
      { title: 'Module 4: Control Flow Statement', lessons: ['If-Else', 'Elif', 'Nested If'] },
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Data Science with Generative AI Course': {
    category: 'Data Science Courses',
    title: 'Data Science with Generative AI Course',
    description: 'The most comprehensive Data Science program that integrates Generative AI. Learn to build LLMs, automate data workflows, and deploy predictive models using cutting-edge AI technologies.',
    views: '45829',
    updated: '05 May, 2026',
    language: 'English/Hinglish',
    price: '₹12,999',
    original: '₹15,999',
    details: [
      "End-to-End Generative AI integration in Data Science workflows.",
      "Master LLMs, Prompt Engineering, and Vector Databases.",
      "Work on 15+ Industry Grade Projects including AI Chatbots.",
      "Dedicated Placement Assistance with Top MNCs.",
      "ISO Certified Professional Certification."
    ],
    curriculum: [
      { title: 'Module 1: Python for Data Science & AI', lessons: ['Python Fundamentals', 'NumPy & Pandas Mastery', 'Data Visualization with Seaborn'] },
      { title: 'Module 2: Generative AI Foundations', lessons: ['Intro to LLMs', 'Prompt Engineering Techniques', 'OpenAI API Integration'] },
      { title: 'Module 3: Machine Learning & Predictive Modeling', lessons: ['Supervised Learning', 'Unsupervised Learning', 'Model Deployment'] },
      { title: 'Module 4: Advanced Gen AI & Agents', lessons: ['LangChain Framework', 'Vector Databases (Pinecone)', 'Building Agentic Workflows'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Master Of Data Analytics Program': {
    category: 'Data Analyst Courses',
    title: 'Master Of Data Analytics Program',
    description: 'Become a certified Data Analyst with our flagship program. Master Excel, SQL, Power BI, and Python to turn raw data into actionable business insights.',
    views: '32104',
    updated: '02 May, 2026',
    language: 'English/Hinglish',
    price: '₹9,999',
    original: '₹12,999',
    details: [
      "Master the 4 Pillars: Excel, SQL, Power BI, and Python.",
      "Real-world Business Case Studies from Retail, Finance, and Tech.",
      "Live Mentorship from Industry Experts at Microsoft & Amazon.",
      "Job-Ready Portfolio Building and Resume Optimization.",
      "Lifetime Access to Course Materials and Community."
    ],
    curriculum: [
      { title: 'Module 1: Data Analytics Foundations (Excel)', lessons: ['Advanced Excel Functions', 'Pivot Tables & VLOOKUP', 'Data Cleaning Techniques'] },
      { title: 'Module 2: SQL for Data Analytics', lessons: ['Basic to Advanced Queries', 'Joins & Subqueries', 'Database Management'] },
      { title: 'Module 3: Power BI Mastery', lessons: ['Data Modeling', 'DAX Formulas', 'Interactive Dashboard Creation'] },
      { title: 'Module 4: Python for Analysts', lessons: ['Intro to Python', 'Pandas for Data Manipulation', 'Exploratory Data Analysis (EDA)'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Power BI Masterclass': {
    category: 'Data Analyst Courses',
    title: 'Power BI Masterclass',
    description: 'The ultimate guide to mastering Microsoft Power BI. Learn to connect data sources, create stunning visualizations, and share insights across your organization.',
    views: '18542',
    updated: '10 May, 2026',
    language: 'English',
    price: '₹1,499',
    original: '₹2,999',
    curriculum: [
      { title: 'Module 1: Getting Started with Power BI', lessons: ['Interface Overview', 'Connecting to Data Sources', 'Query Editor Basics'] },
      { title: 'Module 2: Data Modeling & DAX', lessons: ['Relationship Management', 'Calculated Columns vs Measures', 'Common DAX Functions'] },
      { title: 'Module 3: Advanced Visualizations', lessons: ['Custom Visuals', 'Drill-through & Tooltips', 'Publishing to Power BI Service'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'AI Powered Excel Full Course': {
    category: 'Foundation Courses',
    title: 'AI Powered Excel Full Course',
    description: 'Supercharge your productivity by combining the power of Excel with AI tools like ChatGPT. Learn to automate formulas, clean data, and generate reports in seconds.',
    views: '12403',
    updated: '08 May, 2026',
    language: 'Hinglish',
    price: '₹499',
    original: '₹1,499',
    curriculum: [
      { title: 'Module 1: AI Tools for Excel', lessons: ['Intro to ChatGPT for Excel', 'Using AI for Complex Formulas', 'Flash Fill & AI Features'] },
      { title: 'Module 2: Automating Workflows', lessons: ['AI-Driven Data Cleaning', 'Macro Generation with AI', 'Automated Report Building'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'AI Cohort Course - Batch 01': {
    category: 'AI Kickstart',
    title: 'AI Cohort Course - Batch 01',
    description: 'An intensive, live cohort program designed to take you from Zero to AI Expert in 90 days. Join a community of learners and build the future with AI.',
    views: '8942',
    updated: '01 May, 2026',
    language: 'English',
    price: '₹14,999',
    original: '₹19,999',
    curriculum: [
      { title: 'Week 1-2: AI Foundations', lessons: ['The AI Landscape', 'Neural Networks Basics', 'Deep Learning Intro'] },
      { title: 'Week 3-6: Specialized Track', lessons: ['NLP Applications', 'Computer Vision', 'Generative Models'] },
      { title: 'Week 7-12: Capstone Projects', lessons: ['End-to-End AI App Development', 'Deployment & Scaling'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'SQL for Data Analysts': {
    category: 'Foundation Courses',
    title: 'SQL for Data Analysts',
    description: 'Master SQL, the language of data. Learn to extract, manipulate, and analyze data stored in relational databases like a pro.',
    views: '21094',
    updated: '12 May, 2026',
    language: 'English',
    price: '₹999',
    original: '₹1,999',
    curriculum: [
      { title: 'Module 1: SQL Basics', lessons: ['SELECT, FROM, WHERE', 'Filtering & Sorting', 'Aggregate Functions'] },
      { title: 'Module 2: Intermediate SQL', lessons: ['GROUP BY & HAVING', 'JOINs (Inner, Left, Right)', 'Subqueries'] },
      { title: 'Module 3: Advanced SQL', lessons: ['Window Functions', 'CTEs (Common Table Expressions)', 'Performance Tuning'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Free Data Science Course': {
    category: 'Free Category',
    title: 'Free Data Science Course',
    description: 'Embark a data science journey by learning statistics, ML, & data analysis with hands-on Python, SQL, Power BI related Projects. Embark on a transformative 100-day journey with The iScale\'s Free course.',
    views: '45739',
    updated: '18 Apr,2026',
    language: 'English',
    price: 'FREE',
    original: '₹9,999',
    details: [
      "The iScale's Free Data Science course offers basics of Machine Learning with Python programming and PowerBI tools.",
      "Industry-oriented projects cover fundamental topics of Machine Learning and Artificial Intelligence.",
      "Designed for both IT and non-IT professionals with zero coding knowledge, providing a pathway to a career in Data Science."
    ],
    highlights: [
      { text: "Free Notes & Study material", icon: <FileText size={18} /> },
      { text: "Download Data Set", icon: <Database size={18} /> },
      { text: "GitHub", icon: <Github size={18} /> },
      { text: "Fundamental Kaggle", icon: <Globe size={18} /> },
      { text: "65+ Hours Content", icon: <Clock size={18} /> },
      { text: "Fundamental Machine Learning", icon: <BarChart size={18} /> }
    ],
    faqs: [
      { q: "Q 1) What can I expect to gain from this Free Data Science course?", a: "You will gain a solid foundation in Statistics, Python, Machine Learning, and PowerBI through hands-on projects." },
      { q: "Q 2) Does completing this course guarantee me a data scientist job?", a: "This course is designed for upskilling; while it doesn't guarantee a job, it provides the essential skills to build a strong portfolio." },
      { q: "Q 3) Do you issue certificates upon finishing the course?", a: "Please check our certification section for details on how to obtain a verified certificate." },
      { q: "Q 4) What should I do after completing?", a: "We recommend moving to our Advanced AI Cohort or Advanced Data Science Masters for specialized specialization." }
    ],
    curriculum: [
      { title: 'BASIC FREE AI Full Course', lessons: ['Intro to AI Tools', 'AI Foundations'] },
      { title: 'ADVANCE AI Free Full Course', lessons: ['Advanced Prompts', 'AI Workflows'] },
      { title: 'Python for Data Science Lec-01', lessons: ['Python for Data Science Lec-01 Notes', 'Python for Data Science Lec-01 Video'] },
      { title: 'Python for Data Science Lec-02 to Lec-28', lessons: Array.from({length: 27}, (_, i) => `Lecture ${i+2}`) },
      { title: 'Machine Learning Lecture 01 to 06', lessons: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'Clustering', 'PCA'] },
      { title: 'Machine Learning Notes', lessons: ['Comprehensive ML PDF Notes'] },
      { title: 'Statistics Lecture 01 to 03', lessons: ['Probability', 'Inference', 'Hypothesis Testing'] },
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Free Data Analytics Course': {
    category: 'Free Category',
    title: 'Free Data Analytics Course',
    description: 'Join our Free Data Analytics Course! Gain Python skills, explore libraries, tackle industry projects, and prepare for interviews in 30 days.',
    views: '337047',
    updated: '24 Dec,2025',
    language: 'English',
    price: 'FREE',
    original: '₹7,999',
    curriculum: [
      { title: 'Study Material & Datasets', lessons: ['Download Course Datasets', 'Case Study PDF', 'Resource Links'] },
      { title: 'Power BI Unit 1-12: Complete Mastery', lessons: ['Power BI Unit 1- Introduction', 'Power BI Unit 2- Creating Charts', 'Power BI Unit 3- Creating Tables & Matrix', 'Power BI Unit 4- Slicers', 'Power BI Unit 5- Charts Visualizations Tools', 'Power BI Unit 6- Maps', 'Power BI Unit 7- Cards & Filters', 'Power BI Unit 8- Insert & Action Functions', 'Power BI Unit 9- Advanced Charts', 'Power BI Unit 10- KPI & Other Functions', 'Power BI Unit 11- Create a Super Store Report', 'Power BI Unit 12- Dashboard Functions'] },
      { title: 'Industry Projects (Power BI)', lessons: ['Project 1- Amazon Dashboard Creation', 'Project 2- Netflix Dashboard Creation', 'Project 3- Virat Kohli IPL Performance Dashboard'] },
      { title: 'SQL Mastery & Assignments', lessons: ['SQL Assignment', 'SQL- Unit1- Introduction and Installation', 'SQL Unit 2- Fundamentals of SQL', 'SQL Unit 3- Case Study with Example', 'How to learn SQL with Chat GPT'] },
      { title: '30 Days Python Master Class', lessons: Array.from({length: 30}, (_, i) => {
        const specialized = {
          24: 'Employee Career', 25: 'Doubt Discussion', 26: 'Resume Building', 
          27: 'Interview Discussion', 28: 'Business Case Study', 29: 'E-Comm Supply Chain', 30: 'Customer Lifetime Value'
        };
        const day = i + 1;
        return `Day ${day.toString().padStart(2, '0')}- Python Master Class${specialized[day] ? ` (${specialized[day]})` : ''}`;
      })},
      { title: 'Advanced Data Projects', lessons: ['IPL Dashboard | Free Masterclass', 'India Moon Mission 2023 | DA Project All Parts', 'WhatsApp Chat Analysis | Python Project', 'Python Project- OTT Platform Analysis'] },
      { title: 'Career Prep', lessons: ['Interview Preparation Class & Notes'] }
    ],
    videoUrl: 'https://www.youtube.com/embed/Tsz599KMhFg'
  },
  'Machine Learning with Agentic AI': {
    category: 'Foundation Courses',
    title: 'Machine Learning with Agentic AI',
    description: 'Master the future of AI with our Machine Learning and Agentic AI course. Learn to build intelligent agents and sophisticated ML models that power modern automation and decision-making systems.',
    views: '453',
    updated: '25 Apr, 2026',
    language: 'English',
    price: '₹8,999',
    original: '₹9,999',
    curriculum: [
      { title: 'Module 1: Machine Learning : Regression', lessons: ['Introduction to Regression', 'Linear Regression'] },
      { title: 'Module 2: Machine Learning : Classification', lessons: ['Logistic Regression', 'Decision Trees'] },
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }

};

const CourseDetailPage = ({ setCurrentPage, selectedCourse }) => {
  const [activeTab, setActiveTab] = useState('Course Content');
  const [openFaq, setOpenFaq] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const course = coursesDetails[selectedCourse] || coursesDetails['Advance Python with AI Tools'];

  const tabs = [
    'Overview', 'Course Content', 'Details', 'Highlights', 
    'Certificate', 'FAQ\'s', 'Fees', 'Tools', 'Instructor', 'Review'
  ];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: isMobile ? 140 : 100 }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)', 
        padding: isMobile ? '40px 0' : '60px 0', 
        borderBottom: '1px solid #eee' 
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', 
            gap: isMobile ? 32 : 40, 
            alignItems: 'center' 
          }}>
            <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ color: '#888', fontSize: isMobile ? 12 : 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                Home <ChevronRight size={14} /> {course.category}
              </div>
              <h1 style={{ fontSize: isMobile ? '28px' : 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1a1a2e', marginBottom: 20, lineHeight: 1.2 }}>
                {course.title}
              </h1>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#555', lineHeight: 1.8, marginBottom: 24, maxWidth: 650, margin: isMobile ? '0 auto 24px' : '0 0 24px' }}>
                {course.description}
              </p>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '6px 16px', borderRadius: 100, border: '1px solid #ffebee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 700 }}>Popular</span>
                  <span style={{ color: '#777', fontSize: 11 }}>({course.views} No Of Views)</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: isMobile ? 20 : 30, color: '#666', fontSize: isMobile ? 13 : 14, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} /> {isMobile ? '' : 'Last updated'} {course.updated}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={16} /> {course.language}
                </div>
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: 420, margin: isMobile ? '0' : '0 auto' }}>
              <div 
                onClick={() => setShowVideo(true)}
                style={{ 
                  background: '#000', borderRadius: 16, overflow: 'hidden', 
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)', position: 'relative',
                  aspectRatio: '16/9', cursor: 'pointer'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800" 
                  alt="Course Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                />
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.2)'
                }}>
                  <div style={{ 
                    width: 50, height: 50, background: '#fff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s', boxShadow: '0 0 20px rgba(255,255,255,0.4)'
                  }}>
                    <Play fill="var(--red)" color="var(--red)" size={20} style={{ marginLeft: 3 }} />
                  </div>
                  <div style={{ marginTop: 10, color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <Star size={14} color="#ffd700" fill="#ffd700" /> Preview this course
                  </div>
                </div>
              </div>

              {showVideo && (
                <div onClick={() => setShowVideo(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 10 : 20 }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: 900, aspectRatio: '16/9' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => setShowVideo(false)} style={{ position: 'absolute', top: -35, right: 0, color: '#fff', background: 'none', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <X size={18} /> Close
                    </button>
                    <iframe width="100%" height="100%" src={`${course.videoUrl}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style={{ borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}></iframe>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button style={{ width: '100%', padding: '12px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.3s' }}>
                  <Download size={18} /> Download Curriculum
                </button>
                <button onClick={() => setCurrentPage('login')} style={{ width: '100%', padding: '12px', background: 'var(--red-dark)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.3s' }}>
                  Enroll Now <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: isMobile ? 24 : 40 }}>
        <div style={{ 
          display: 'flex', gap: 8, background: '#eee', padding: 6, borderRadius: 12, 
          overflowX: 'auto', marginBottom: isMobile ? 20 : 30,
          scrollbarWidth: 'none', msOverflowStyle: 'none'
        }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 8, background: activeTab === tab ? 'var(--red)' : 'transparent', color: activeTab === tab ? '#fff' : '#555', fontWeight: 600, fontSize: isMobile ? 13 : 14, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{tab}</button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: isMobile ? 16 : 20, padding: isMobile ? '24px 20px' : 40, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          {activeTab === 'Course Content' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800 }}>Course Content</h2>
                <button style={{ color: 'var(--red)', fontWeight: 700, fontSize: 13, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>DOWNLOAD <Download size={16} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
                {course.curriculum.map((item, idx) => (
                  <CurriculumItem key={idx} item={item} idx={idx} isLast={idx === course.curriculum.length - 1} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Details' && (
            <div>
              <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, marginBottom: 24 }}>Course Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 24 : 40 }}>
                <div style={{ background: '#f8f9ff', borderRadius: 16, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Detail" style={{ width: '100%', borderRadius: 12 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {(course.details || defaultDetails).map((detail, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ marginTop: 3 }}><CheckCircle size={16} color="var(--red)" /></div>
                      <p style={{ fontSize: isMobile ? 14 : 16, color: '#444', lineHeight: 1.6 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Highlights' && (
            <div>
              <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, marginBottom: 24 }}>Key Highlights</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {(course.highlights || defaultHighlights).map((item, i) => (
                  <div key={i} style={{ padding: isMobile ? '16px' : '20px', background: '#f8f9ff', borderRadius: 12, border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {item.icon || <Star size={18} color="var(--red)" fill="var(--red)" />}
                    <span style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1a1a2e' }}>{item.text || item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAQ\'s' && (
            <div>
              <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, marginBottom: 24 }}>FAQ's</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(course.faqs || defaultFaqs).map((faq, idx) => (
                  <div key={idx} style={{ border: '1px solid #eee', borderRadius: 10, overflow: 'hidden' }}>
                    <div onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: openFaq === idx ? '#f8f9ff' : '#fff' }}>
                      <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, color: '#1a1a2e', pr: 10 }}>{faq.q}</span>
                      <ChevronDown size={18} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </div>
                    {openFaq === idx && <div style={{ padding: '16px 20px', color: '#555', fontSize: 14, lineHeight: 1.6, borderTop: '1px solid #eee' }}>{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Overview' && (
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#555', lineHeight: 1.8, marginBottom: 20 }}>{course.description}</p>
              <h2 style={{ textAlign: 'center', fontSize: isMobile ? 24 : 32, fontWeight: 800, color: '#1a1a2e', margin: isMobile ? '30px 0' : '40px 0' }}>Transform your <span style={{color:'var(--red)'}}>Skills</span>, Transform your <span style={{color:'var(--red)'}}>Career!</span></h2>
              <div style={{textAlign: 'center'}}><button style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, fontSize: 14 }}>Show More</button></div>
            </div>
          )}

          {activeTab === 'Fees' && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, marginBottom: 24 }}>Program Fees</h2>
              <div style={{ maxWidth: 450, margin: '0 auto', padding: isMobile ? '30px 20px' : '40px', background: 'var(--red)', borderRadius: 20, color: '#fff' }}>
                <h3 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 12 }}>Indian Residents</h3>
                <div style={{ fontSize: isMobile ? 42 : 56, fontWeight: 800, marginBottom: 8 }}>{course.price}</div>
                <p style={{ opacity: 0.8, fontSize: 13, marginBottom: 24 }}>{course.price === 'FREE' ? 'Limited Time Offer' : '(Incl. Taxes)*'}</p>
                <button onClick={() => setCurrentPage('login')} style={{ width: '100%', padding: '14px', background: '#fff', color: 'var(--red)', borderRadius: 10, fontWeight: 700, border: 'none', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>Download Details <Download size={18} /></button>
              </div>
            </div>
          )}

          {/* Fallback for other tabs */}
          {!['Course Content', 'Details', 'Highlights', 'FAQ\'s', 'Overview', 'Fees'].includes(activeTab) && (
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{activeTab}</h2>
              <p style={{ color: '#666', fontSize: 14 }}>Information is being updated for this section.</p>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Bottom Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%',
        background: '#fff', borderTop: '1px solid #eee', padding: isMobile ? '12px 0' : '16px 0',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.05)', zIndex: 1000
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
          <div style={{ flex: 1, display: isMobile ? 'none' : 'block' }}>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>{course.title}: From Zero to Expert!</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: 'var(--red)', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>{course.price === 'FREE' ? 'OFFER' : 'COUPON'}</span>
                <span style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: 'var(--red)' }}>{course.price}</span>
                {course.price !== 'FREE' && <span style={{ fontSize: 14, color: '#bbb', textDecoration: 'line-through' }}>{course.original}</span>}
              </div>
            </div>
            <button 
              onClick={() => setCurrentPage('login')}
              style={{
              background: 'linear-gradient(to right, #8b0000, #ff0000)',
              color: '#fff', padding: isMobile ? '10px 20px' : '14px 40px', borderRadius: 8,
              fontSize: isMobile ? 13 : 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 15px rgba(237,28,36,0.3)',
              flex: isMobile ? 1 : 'none',
              justifyContent: 'center',
              whiteSpace: 'nowrap'
            }}>
              Enroll Now <ArrowRight size={isMobile ? 14 : 20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
