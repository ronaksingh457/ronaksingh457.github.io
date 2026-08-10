import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if ('ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const INACTIVITY_DELAY = 700;
    const FADE_DURATION = 220;

    const trailPoints: { x: number; y: number }[] = [];
    const MAX_TRAIL = 14;

    interface Sparkle {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number;
      rotation: number; rotSpeed: number; isStar: boolean;
    }

    const particles: Sparkle[] = [];
    let cursorActive = false;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    let mouse = { x: width / 2, y: height / 2 };

    canvas.style.opacity = '0';
    canvas.style.transition = `opacity ${FADE_DURATION}ms ease`;

    function activate() {
      cursorActive = true;
      canvas!.style.opacity = '1';
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        cursorActive = false;
        trailPoints.length = 0;
        // Clear all particles immediately so nothing remains visible
        particles.length = 0;
        canvas!.style.opacity = '0';
        // Force a clear redraw so no frozen trail remains
        ctx!.clearRect(0, 0, width, height);
      }, INACTIVITY_DELAY);
    }

    function onMove(e: MouseEvent) {
      activate();
      const vx = e.clientX - mouse.x;
      const vy = e.clientY - mouse.y;
      mouse = { x: e.clientX, y: e.clientY };

      trailPoints.push({ x: mouse.x, y: mouse.y });
      if (trailPoints.length > MAX_TRAIL) trailPoints.shift();

      const speed = Math.hypot(vx, vy);
      const count = Math.min(3, Math.floor(speed * 0.18) + 1);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 4,
          y: mouse.y + (Math.random() - 0.5) * 4,
          vx: -vx * 0.08 + (Math.random() - 0.5) * 1,
          vy: -vy * 0.08 + (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 0.8,
          life: Math.floor(Math.random() * 18 + 12),
          maxLife: Math.floor(Math.random() * 18 + 12),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2,
          isStar: Math.random() > 0.5,
        });
      }
    }

    function onClick(e: MouseEvent) {
      activate();
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 3 + 1;
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * force, vy: Math.sin(angle) * force,
          size: Math.random() * 2.5 + 1, life: 20, maxLife: 20,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.3,
          isStar: Math.random() > 0.4,
        });
      }
    }

    function onResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onClick);
    window.addEventListener('resize', onResize);

    function drawSparkle(p: Sparkle) {
      const progress = p.life / p.maxLife;
      const alpha = Math.max(0, Math.sin(progress * Math.PI));
      const sz = p.size * (0.3 + 0.7 * progress);

      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);

      if (p.isStar) {
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.shadowBlur = 6;
        ctx!.shadowColor = `rgba(255,255,255,${alpha * 0.7})`;
        for (let i = 0; i < 4; i++) {
          ctx!.lineTo(Math.cos((i * Math.PI) / 2) * sz, Math.sin((i * Math.PI) / 2) * sz);
          ctx!.lineTo(Math.cos(((i + 0.5) * Math.PI) / 2) * (sz * 0.28), Math.sin(((i + 0.5) * Math.PI) / 2) * (sz * 0.28));
        }
        ctx!.closePath();
        ctx!.fill();
      } else {
        ctx!.beginPath();
        ctx!.arc(0, 0, sz * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        ctx!.shadowBlur = 5;
        ctx!.shadowColor = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }
      ctx!.restore();
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      // Ribbon
      if (cursorActive && trailPoints.length > 2) {
        ctx!.save();
        ctx!.beginPath();
        ctx!.moveTo(trailPoints[0].x, trailPoints[0].y);
        for (let i = 1; i < trailPoints.length - 1; i++) {
          const xc = (trailPoints[i].x + trailPoints[i + 1].x) / 2;
          const yc = (trailPoints[i].y + trailPoints[i + 1].y) / 2;
          ctx!.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc);
        }
        const last = trailPoints[trailPoints.length - 1];
        ctx!.lineTo(last.x, last.y);

        const grad = ctx!.createLinearGradient(
          trailPoints[0].x, trailPoints[0].y, last.x, last.y
        );
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.35)');
        grad.addColorStop(1, 'rgba(255,255,255,0.9)');

        ctx!.lineWidth = 1.4;
        ctx!.strokeStyle = grad;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = 'rgba(255,255,255,0.5)';
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';
        ctx!.stroke();
        ctx!.restore();
      }

      // Sparkles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.rotation += p.rotSpeed;
        p.life--;
        drawSparkle(p);
        if (p.life <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('resize', onResize);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[999999]"
      aria-hidden="true"
    />
  );
}
