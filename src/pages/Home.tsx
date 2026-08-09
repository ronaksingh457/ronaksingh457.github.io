import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUser, saveUser, createUser } from '../utils/storage';

/* ─── Monolith Hero (from user snippet, adapted monochrome) ─── */
function HeroMonolith() {
  const waterRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = waterRef.current;
    if (!canvas) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const c = canvas.getContext('2d')!;
    if (!c) return;
    const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w: number, h: number, ratio: number, frame: number;
    const resize = () => {
      ratio = Math.min(devicePixelRatio, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * ratio; canvas.height = h * ratio;
      c.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const wave = (x: number, row: number, time: number) =>
      Math.sin(x * .014 + row * .77 + time * .00072) * (1.2 + row * .047) +
      Math.sin(x * .052 - row * 1.41 - time * .0011) * (0.65 + row * .02) +
      Math.sin(x * .003 + row * .31 + time * .00038) * 2.2;
    const seed = (v: number) => (Math.sin(v * 91.347) * 43758.5453) % 1;

    function render(time = 0) {
      c.clearRect(0, 0, w, h);
      const horizon = h * .68;
      const waterGrad = c.createLinearGradient(0, horizon, 0, h);
      waterGrad.addColorStop(0, '#060b0e'); waterGrad.addColorStop(.42, '#080e12'); waterGrad.addColorStop(1, '#020405');
      c.fillStyle = waterGrad; c.fillRect(0, horizon, w, h - horizon);

      const glow = c.createRadialGradient(w / 2, horizon + 9, 0, w / 2, horizon + 9, w * .18);
      glow.addColorStop(0, 'rgba(200,210,220,.35)'); glow.addColorStop(.2, 'rgba(112,130,140,.14)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = glow; c.fillRect(0, horizon - 45, w, h - horizon + 45);

      const rows = 70;
      for (let row = 0; row < rows; row++) {
        const progress = row / rows;
        const y = horizon + Math.pow(progress, 1.62) * (h - horizon + 32);
        const alpha = .055 + progress * .1;
        c.beginPath(); c.moveTo(0, y + wave(0, row, time));
        for (let x = 0; x <= w + 16; x += 16) c.lineTo(x, y + wave(x, row, time));
        c.strokeStyle = `rgba(76,98,106,${alpha})`; c.lineWidth = .4 + progress * .9; c.stroke();

        const spread = 20 + progress * w * .16;
        const rOff = (seed(row + 4.1) - .5) * spread * 1.15;
        const flicker = .38 + .62 * Math.max(0, Math.sin(time * .0017 + row * 1.93));
        const shimmer = (1 - progress * .58) * flicker * (.13 + seed(row + 5) * .18);
        const center = w / 2 + rOff;
        const streak = 9 + progress * 52 * seed(row + 1.7);
        c.beginPath();
        c.moveTo(center - streak, y + wave(center - streak, row, time));
        c.lineTo(center + streak, y + wave(center + streak, row, time));
        c.strokeStyle = `rgba(210,220,230,${shimmer})`; c.lineWidth = .5 + progress * 1.1; c.stroke();
      }
      if (motionOK) frame = requestAnimationFrame(render);
    }

    addEventListener('resize', resize, { passive: true });
    resize(); render();
    return () => { removeEventListener('resize', resize); cancelAnimationFrame(frame!); };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#030405]" aria-label="ABTalks Hero">
      <canvas ref={waterRef} className="absolute inset-0 w-full h-full" />

      {/* Mist */}
      <div className="absolute inset-0 opacity-60" style={{
        background: 'radial-gradient(ellipse 30% 6% at 50% 63%, rgba(200,210,220,.12), transparent 78%)',
        filter: 'blur(17px)',
      }} />

      {/* Monolith A */}
      <div
        className="absolute z-10 left-1/2 -translate-x-1/2"
        style={{
          bottom: '23.5%',
          width: 'clamp(180px, 38vw, 400px)',
          aspectRatio: '1.05',
          filter: 'drop-shadow(0 16px 35px rgba(200,210,220,.2))',
          animation: 'drift 5s ease-in-out infinite',
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            bottom: '-14%', width: '52%', height: '8%',
            background: 'rgba(200,215,220,.3)',
            filter: 'blur(17px)',
            animation: 'halo 5s ease-in-out infinite',
          }}
        />
        <svg viewBox="0 0 400 380" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="metal" x1=".08" y1="0" x2=".85" y2=".9">
              <stop stopColor="#f8fbfc" /><stop offset=".33" stopColor="#c9d0d3" />
              <stop offset=".61" stopColor="#919ba1" /><stop offset="1" stopColor="#e8edef" />
            </linearGradient>
            <linearGradient id="side" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#55636c" /><stop offset="1" stopColor="#d9e1e3" />
            </linearGradient>
            <linearGradient id="glint" x1="0" x2="1">
              <stop stopColor="white" stopOpacity="0" /><stop offset=".48" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#metal)" d="M200 12 385 343H285L200 184 115 343H15L200 12Zm0 130-66 119h132L200 142Z" fillRule="evenodd" />
          <path fill="url(#side)" opacity=".92" d="m200 12 185 331h-100l-85-159v-42l66 119h-45l-21-38V12Z" />
          <path fill="#071018" d="m200 142 66 119h-132l66-119Z" />
          <path fill="url(#glint)" opacity=".48" style={{ mixBlendMode: 'screen', animation: 'shine 4.8s ease-in-out infinite' }} d="M179 35h46l93 280h-34L179 35Z" />
          <path fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.1" d="M200 12 385 343M200 12 15 343M115 343l85-159 85 159" />
        </svg>
      </div>

      {/* Headline overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[8vh] md:pb-[10vh] pointer-events-none">
        <div className="text-center px-6 pointer-events-auto">
          <h1
            className="text-[clamp(32px,8vw,80px)] font-extrabold tracking-[-0.06em] text-white leading-[0.95] mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            60 Days. 60 Builds.<br />
            <span className="text-neutral-500">One Stronger You.</span>
          </h1>
          <p className="text-neutral-400 text-[clamp(14px,2.5vw,20px)] max-w-lg mx-auto leading-relaxed mb-8">
            Build something every day. Prove your progress publicly. Turn consistency into a portfolio recruiters can see.
          </p>
          <a href="#start" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-2xl text-base hover:bg-neutral-200 transition-colors">
            Start Your 60-Day Challenge →
          </a>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
    </section>
  );
}

/* ─── Onboarding Card ─── */
function OnboardingCard({ onComplete }: { onComplete: (u: any) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Frontend');
  const [shake, setShake] = useState(false);
  const tracks = ['Frontend', 'Backend', 'AI / ML', 'DSA', 'App Development'];

  const submit = () => {
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    const user = createUser(name.trim(), email.trim(), track);
    saveUser(user);
    onComplete(user);
  };

  return (
    <section id="start" className="relative z-10 py-20 px-4 flex justify-center">
      <div
        className={`w-full max-w-[420px] rounded-3xl p-8 md:p-10 border border-neutral-800 transition-transform ${shake ? 'animate-shake' : ''}`}
        style={{
          background: 'linear-gradient(145deg, #0e0e0e 0%, #0a0a0a 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.05)',
        }}
      >
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">Begin</p>
          <h2 className="text-[28px] font-bold text-white tracking-tight leading-tight">
            Start your 60-day<br />journey
          </h2>
          <p className="text-neutral-500 text-sm mt-2">Build daily. Prove your progress.</p>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-1.5">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ronak"
              className="w-full bg-[#0a0a0a] border border-neutral-800 text-white placeholder:text-neutral-600 px-4 py-3.5 rounded-xl focus:outline-none focus:border-neutral-500 transition-colors text-[15px]"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-1.5">Your Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ronak@example.com"
              type="email"
              className="w-full bg-[#0a0a0a] border border-neutral-800 text-white placeholder:text-neutral-600 px-4 py-3.5 rounded-xl focus:outline-none focus:border-neutral-500 transition-colors text-[15px]"
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">What do you want to build?</p>
          <div className="flex flex-wrap gap-2">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={`px-4 py-2 rounded-full text-[13px] border transition-all duration-200 ${
                  track === t
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-neutral-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={submit}
          className="w-full py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200"
        >
          Start Day 1 →
        </button>
      </div>
    </section>
  );
}

/* ─── Welcome Transition ─── */
function WelcomeTransition({ name, onDone }: { name: string; onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(onDone, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      <div className="text-center px-6">
        <h2
          className="text-white font-bold tracking-tight transition-all duration-700"
          style={{
            fontSize: 'clamp(28px, 6vw, 56px)',
            opacity: phase >= 0 ? 1 : 0,
            transform: phase >= 0 ? 'translateY(0)' : 'translateY(20px)',
            display: phase >= 2 ? 'none' : 'block',
          }}
        >
          {phase === 0 && `Welcome, ${name}.`}
          {phase === 1 && 'Your 60-day journey starts today.'}
        </h2>
        {phase === 2 && (
          <div className="text-white">
            <p className="text-neutral-500 text-sm tracking-widest uppercase mb-2">Beginning</p>
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter">DAY 1 / 60</h2>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Choose Your Track', desc: 'Pick the development path that matches your goals — Frontend, Backend, AI/ML, DSA, or App Development.' },
    { num: '02', title: "Build Today's Challenge", desc: 'Each day brings a practical, focused coding challenge designed to strengthen your skills progressively.' },
    { num: '03', title: 'Submit Your Proof', desc: 'Push your code to GitHub and share your progress on LinkedIn. Make your learning visible and verifiable.' },
    { num: '04', title: 'Keep Your Streak Alive', desc: 'Return every day. Build consistency. Watch your portfolio grow from zero to 60 real projects.' },
  ];

  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">Process</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How It Works</h3>
        </div>
        <div className="space-y-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative bg-[#0a0a0a] border border-neutral-800/60 rounded-2xl p-6 md:p-8 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex gap-5 items-start">
                <span className="text-neutral-600 font-mono text-sm mt-1 shrink-0 w-6">{s.num}</span>
                <div>
                  <h4 className="text-white font-semibold text-lg md:text-xl mb-2">{s.title}</h4>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tracks ─── */
function TracksSection() {
  const tracks = [
    { name: 'Frontend', icon: '◧', desc: 'Master HTML, CSS, React, responsive design, and modern UI patterns.' },
    { name: 'Backend', icon: '⊞', desc: 'Build APIs, databases, authentication flows, and server architecture.' },
    { name: 'AI / ML', icon: '◉', desc: 'Explore datasets, train models, and build intelligent interfaces.' },
    { name: 'DSA', icon: '△', desc: 'Visualize algorithms, understand data structures, and solve problems.' },
    { name: 'App Development', icon: '◻', desc: 'Design mobile UIs, navigation flows, and app store experiences.' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">Tracks</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Choose Your Path</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((t) => (
            <div
              key={t.name}
              className="bg-[#0a0a0a] border border-neutral-800/60 rounded-2xl p-6 hover:border-neutral-600 hover:bg-[#0f0f0f] transition-all duration-300 group"
            >
              <span className="text-2xl mb-3 block text-neutral-500 group-hover:text-white transition-colors">{t.icon}</span>
              <h4 className="text-white font-semibold text-lg mb-2">{t.name}</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why ABTalks ─── */
function WhySection() {
  const reasons = [
    { title: 'Build Real Projects', desc: 'Not tutorials. Not theory. You ship something tangible every single day.' },
    { title: 'Stay Consistent', desc: 'A streak-based system that makes quitting harder than continuing.' },
    { title: 'Grow GitHub Activity', desc: '60 days of commits. Your contribution graph turns solid green.' },
    { title: 'Build LinkedIn Presence', desc: '60 posts documenting your journey. Recruiters notice patterns.' },
    { title: 'Visible Proof of Work', desc: 'Every day generates evidence that you can write code under pressure.' },
    { title: 'Portfolio Through Action', desc: 'Stop planning your portfolio. Start building it — one day at a time.' },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">Why</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Why ABTalks</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-[#0a0a0a] border border-neutral-800/60 rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-2">{r.title}</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  const navigate = useNavigate();
  const user = loadUser();

  return (
    <section className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h3
          className="text-[clamp(28px,5vw,52px)] font-bold text-white tracking-tight leading-tight mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Your next 60 days can change your portfolio.
        </h3>
        <button
          onClick={() => navigate(user ? `/challenge/${user.currentDay}` : '#start')}
          className="px-10 py-4 bg-white text-black font-bold rounded-2xl text-lg hover:bg-neutral-200 active:scale-[0.98] transition-all"
        >
          {user ? 'Continue Challenge →' : 'Start Day 1 →'}
        </button>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-neutral-800/60">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-neutral-600 text-sm">ABTalks © {new Date().getFullYear()}</p>
        <p className="text-neutral-700 text-xs">60 Days. 60 Builds. One Stronger You.</p>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  const navigate = useNavigate();
  const existingUser = loadUser();
  const [showOnboarding, setShowOnboarding] = useState(!existingUser);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  return (
    <main className="bg-[#050505] min-h-screen">
      <HeroMonolith />

      {showWelcome && (
        <WelcomeTransition
          name={welcomeName}
          onDone={() => { setShowWelcome(false); navigate('/dashboard'); }}
        />
      )}

      {showOnboarding ? (
        <>
          <OnboardingCard
            onComplete={(user) => {
              setWelcomeName(user.name);
              setShowOnboarding(false);
              setShowWelcome(true);
            }}
          />
          <HowItWorks />
          <TracksSection />
          <WhySection />
          <FinalCTA />
        </>
      ) : (
        <>
          <HowItWorks />
          <TracksSection />
          <WhySection />
          <FinalCTA />
        </>
      )}

      <Footer />
      <div className="h-20 md:h-0" /> {/* bottom nav spacer */}
    </main>
  );
}
