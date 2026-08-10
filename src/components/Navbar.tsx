import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadUser, clearUser } from '../utils/storage';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const user = loadUser();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Current Challenge', path: user ? `/challenge/${user.currentDay}` : '/dashboard' },
    { label: 'About', path: '/#about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  function handleSwitch() {
    if (confirm('Switch user? This will clear your current progress.')) {
      clearUser();
      setOpen(false);
      navigate('/');
      window.location.reload();
    }
  }

  function handleNav(path: string) {
    setOpen(false);
    navigate(path);
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 md:top-5 md:right-5 z-[101] w-14 h-14 grid place-items-center rounded-full border border-neutral-600 bg-[#111] cursor-pointer"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className="relative w-5 h-5 flex items-center justify-center">
          <span
            className="absolute w-[19px] h-[1.5px] rounded bg-white transition-transform duration-300"
            style={{
              transform: open ? 'rotate(45deg)' : 'translateY(-5px)',
              background: open ? '#fff' : '#fff',
            }}
          />
          <span
            className="absolute w-[19px] h-[1.5px] rounded bg-white transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="absolute w-[19px] h-[1.5px] rounded bg-white transition-transform duration-300"
            style={{
              transform: open ? 'rotate(-45deg)' : 'translateY(5px)',
            }}
          />
        </span>
      </button>

      {/* Curved Menu */}
      <nav
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          clipPath: open
            ? 'ellipse(180% 120% at 100% 50%)'
            : 'ellipse(0% 50% at 100% 50%)',
          transition: 'clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 md:left-auto md:w-[min(30vw,420px)] md:min-w-[320px] w-full h-full bg-[#1a1a1a]">
          <div
            className="flex flex-col justify-between h-full px-8 md:px-12 transition-all duration-500"
            style={{
              paddingTop: 'clamp(100px, 14vh, 140px)',
              paddingBottom: '48px',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: open ? '0.25s' : '0s',
            }}
          >
            <div>
              <p className="text-neutral-400 text-[9px] tracking-[1.2px] uppercase font-medium mb-2">
                Navigation
              </p>
              <div className="h-px bg-neutral-600 mb-8" />

              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.path)}
                      className="block text-left w-full text-white text-[clamp(30px,4vw,44px)] leading-tight font-light tracking-tight hover:text-neutral-400 hover:translate-x-2 transition-all duration-300"
                    >
                      {isActive(link.path) && (
                        <span className="inline-block mr-3 text-[20px] align-middle">•</span>
                      )}
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="h-px bg-neutral-700" />
              {user && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-500 text-[9px] tracking-wider uppercase">Signed in as</p>
                    <p className="text-neutral-200 text-sm">{user.name}</p>
                  </div>
                  <button
                    onClick={handleSwitch}
                    className="text-neutral-500 text-xs border border-neutral-700 px-3 py-1.5 rounded-lg hover:text-white hover:border-neutral-500 transition"
                  >
                    Switch User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom nav — mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-around py-2">
          {[
            { label: 'Home', icon: '⌂', path: '/' },
            { label: 'Dashboard', icon: '◧', path: '/dashboard' },
            { label: 'Challenge', icon: '▶', path: user ? `/challenge/${user.currentDay}` : '/dashboard' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 min-w-[64px] transition ${
                isActive(item.path)
                  ? 'text-white'
                  : 'text-neutral-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
