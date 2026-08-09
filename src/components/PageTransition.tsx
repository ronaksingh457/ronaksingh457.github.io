import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      setDisplayChildren(children);
      return;
    }
    prevPath.current = location.pathname;

    // Start transition
    setTransitioning(true);

    const t = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 380);

    return () => clearTimeout(t);
  }, [location.pathname, children]);

  return (
    <div className="relative min-h-screen">
      {/* Transition overlay */}
      <div
        className="fixed inset-0 z-[9990] pointer-events-none"
        style={{
          background: '#080808',
          opacity: transitioning ? 1 : 0,
          transition: 'opacity 0.38s ease',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(12px) scale(0.99)' : 'translateY(0) scale(1)',
          filter: transitioning ? 'blur(3px)' : 'blur(0)',
          transition: 'opacity 0.45s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1), filter 0.45s ease',
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}
