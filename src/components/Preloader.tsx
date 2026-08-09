import { useState, useEffect, useCallback } from 'react';

const greetings = ['Hello', 'Hei', 'Hola', 'Bonjour', 'Hallo', 'Namaste'];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const [revealing, setRevealing] = useState(false);

  const finish = useCallback(() => {
    setTextVisible(false);
    setTimeout(() => {
      setRevealing(true);
      setTimeout(() => {
        setVisible(false);
        onDone();
      }, 1300);
    }, 200);
  }, [onDone]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      onDone();
      return;
    }

    let i = 0;
    const cycle = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        i++;
        if (i >= greetings.length) {
          clearInterval(cycle);
          finish();
          return;
        }
        setIndex(i);
        setTextVisible(true);
      }, 120);
    }, 500);

    return () => clearInterval(cycle);
  }, [finish, onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: '#080808',
        clipPath: revealing
          ? 'ellipse(155% 0% at 50% 0%)'
          : 'ellipse(155% 130% at 50% 0%)',
        transition: 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: revealing ? 'none' : 'auto',
      }}
      aria-live="polite"
    >
      <div className="text-center">
        <p
          className="text-white font-light tracking-[-0.055em] transition-all duration-200 ease-out"
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            opacity: textVisible ? 0.9 : 0,
            filter: textVisible ? 'blur(0px)' : 'blur(12px)',
            transform: textVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(12px) scale(0.96)',
          }}
        >
          <span className="text-neutral-500 mr-2">•</span>
          {greetings[index]}
        </p>
      </div>
    </div>
  );
}
