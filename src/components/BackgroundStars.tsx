import { useEffect, useRef } from 'react';

export default function BackgroundStars({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const starCount = Math.floor(120 * intensity);
    let width = 0, height = 0, prev = 0;
    const random = (a: number, b: number) => Math.random() * (b - a) + a;

    interface Star {
      x: number; y: number; radius: number;
      speed: number; drift: number; opacity: number; streak: boolean;
    }

    let stars: Star[] = [];

    function createStar(fromTop = false): Star {
      const bright = Math.random() > 0.82;
      return {
        x: random(0, width),
        y: fromTop ? random(-30, 0) : random(0, height),
        radius: bright ? random(0.7, 1.2) : random(0.2, 0.65),
        speed: bright ? random(25, 55) : random(6, 22),
        drift: random(-4, 4),
        opacity: bright ? random(0.45, 0.85) : random(0.12, 0.5),
        streak: bright && Math.random() > 0.5,
      };
    }

    function resize() {
      const box = canvas!.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas!.width = width * ratio;
      canvas!.height = height * ratio;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = [];
      for (let i = 0; i < starCount; i++) stars.push(createStar());
      ctx!.fillStyle = '#000';
      ctx!.fillRect(0, 0, width, height);
    }

    function animate(time: number) {
      const delta = Math.min((time - prev) / 1000, 0.05);
      prev = time;

      ctx!.fillStyle = 'rgba(0,0,0,0.28)';
      ctx!.fillRect(0, 0, width, height);

      stars.forEach((star, i) => {
        const dist = star.speed * delta;
        star.y += dist;
        star.x += star.drift * delta;

        if (star.y > height + 10 || star.x < -10 || star.x > width + 10) {
          stars[i] = createStar(true);
          return;
        }

        const fade = star.opacity * Math.min(1, star.y / 40, (height - star.y) / 70);

        if (star.streak) {
          const tail = Math.max(3, dist * 2);
          const grad = ctx!.createLinearGradient(star.x, star.y - tail, star.x, star.y);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(1, `rgba(255,255,255,${fade})`);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = star.radius;
          ctx!.beginPath();
          ctx!.moveTo(star.x, star.y - tail);
          ctx!.lineTo(star.x, star.y);
          ctx!.stroke();
        }

        ctx!.fillStyle = `rgba(255,255,255,${fade})`;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fill();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame((t) => { prev = t; animate(t); });

    return () => window.removeEventListener('resize', resize);
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: intensity * 0.6 }}
      aria-hidden="true"
    />
  );
}
