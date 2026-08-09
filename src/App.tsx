import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import BackgroundStars from './components/BackgroundStars';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';

function AppRoutes() {
  const location = useLocation();
  const intensity = location.pathname === '/' ? 1 : location.pathname === '/dashboard' ? 0.5 : 0.25;

  return (
    <>
      <BackgroundStars intensity={intensity} />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenge/:day" element={<Challenge />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <Preloader onDone={() => setLoaded(true)} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
