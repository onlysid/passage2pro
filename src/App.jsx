import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Overview, Contact, Timeline, Gallery, Hero, Navbar, Works, Leo, Footer, Socials, ProtectedRoute, Maintain } from './components';
import { AuthProvider } from './Login'; // Import AuthProvider from Login.jsx
import LoginPage from './Login';
import AdminPage from './Admin';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={
            <div className='relative z-0 bg-primary'>
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center absolute top-0 h-screen w-full" />
            <div className="bg-gradient-to-b from-black/0 via-black/10 to-primary w-full absolute top-0 h-screen"></div>
              <div>
                <Navbar />
                <Hero />
              </div>
              <div className="relative z-0">
                <Overview />
                <Socials />
                <Leo />
                <Timeline />
                <Works />
                <Contact />
                <Gallery />
                <Socials />
                <Footer />
              </div>
            </div>
            // <Maintain />

          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;