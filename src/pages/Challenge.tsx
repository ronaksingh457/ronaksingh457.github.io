import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadUser, saveUser, completeDay } from '../utils/storage';
import { challenges, milestones } from '../data/challenges';

export default function ChallengePage() {
  const { day: dayParam } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(dayParam || '1');
  const user = loadUser();

  const challenge = challenges.find((c) => c.day === dayNum) || challenges[0];
  const isCompleted = user?.completedDays?.includes(dayNum) || false;
  const isFinalDay = dayNum === 60;
  const milestone = milestones[dayNum];

  // Load drafts / saved submission
  const savedGithub = user?.submissions?.[dayNum]?.github || user?.drafts?.github || '';
  const savedLinkedin = user?.submissions?.[dayNum]?.linkedin || user?.drafts?.linkedin || '';

  const [github, setGithub] = useState(savedGithub);
  const [linkedin, setLinkedin] = useState(savedLinkedin);
  const [submitted, setSubmitted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [errors, setErrors] = useState<{ github?: string; linkedin?: string }>({});

  // Auto-save drafts
  useEffect(() => {
    if (!user || isCompleted) return;
    const timer = setTimeout(() => {
      const updated = {
        ...user,
        drafts: { github, linkedin },
      };
      saveUser(updated);
    }, 500);
    return () => clearTimeout(timer);
  }, [github, linkedin]);

  // Reset state on day change
  useEffect(() => {
    setSubmitted(false);
    setShowCompletion(false);
    setErrors({});
    const u = loadUser();
    setGithub(u?.submissions?.[dayNum]?.github || u?.drafts?.github || '');
    setLinkedin(u?.submissions?.[dayNum]?.linkedin || u?.drafts?.linkedin || '');
  }, [dayNum]);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start your journey first</h2>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-black rounded-xl font-bold">
            Get Started
          </button>
        </div>
      </main>
    );
  }

  const validate = () => {
    const errs: { github?: string; linkedin?: string } = {};
    if (!github.trim()) errs.github = 'GitHub URL is required';
    else if (!github.includes('github.com')) errs.github = 'Enter a valid GitHub URL';
    if (!linkedin.trim()) errs.linkedin = 'LinkedIn URL is required';
    else if (!linkedin.includes('linkedin.com')) errs.linkedin = 'Enter a valid LinkedIn URL';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const updated = completeDay(user, dayNum, github.trim(), linkedin.trim());
    saveUser(updated);
    setSubmitted(true);
    setShowCompletion(true);

    setTimeout(() => setShowCompletion(false), 4000);
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-32 px-5">
      <div className="max-w-2xl mx-auto">

        {/* ─── Completion overlay ─── */}
        {showCompletion && (
          <div className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center">
            <div className="text-center px-6 animate-fadeIn">
              <div className="text-5xl mb-6 animate-pulse">✓</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-3">
                DAY {dayNum} COMPLETE
              </h2>
              {milestone && (
                <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">
                  🏆 Milestone: {milestone}
                </p>
              )}
              <p className="text-2xl font-bold text-white mt-4 mb-2">
                {user.streak + 1} DAY STREAK
              </p>
              <p className="text-neutral-400 mb-8">
                {isFinalDay
                  ? "You've completed the entire 60-day challenge!"
                  : "You're building momentum. Keep it going."}
              </p>
              {!isFinalDay ? (
                <button
                  onClick={() => { setShowCompletion(false); navigate(`/challenge/${dayNum + 1}`); }}
                  className="px-10 py-4 bg-white text-black font-bold rounded-xl text-base hover:bg-neutral-100 transition"
                >
                  Continue to Day {dayNum + 1} →
                </button>
              ) : (
                <button
                  onClick={() => { setShowCompletion(false); navigate('/dashboard'); }}
                  className="px-10 py-4 bg-white text-black font-bold rounded-xl text-base"
                >
                  View Your Journey →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ─── Header ─── */}
        <section className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-neutral-500 text-sm hover:text-neutral-300 transition mb-4 inline-flex items-center gap-1"
          >
            ← Dashboard
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500"
            >
              Day {dayNum} / 60
            </span>
            <span className="text-neutral-700">·</span>
            <span className="text-[10px] text-neutral-500">{challenge.track}</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[10px] text-neutral-500">{challenge.duration}</span>
          </div>

          <h1
            className="text-[clamp(28px,6vw,48px)] font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {challenge.title}
          </h1>

          {milestone && (
            <div className="mt-3 inline-block px-3 py-1 rounded-full border border-neutral-700 text-[10px] uppercase tracking-widest text-neutral-400">
              Milestone: {milestone}
            </div>
          )}

          {isCompleted && !submitted && (
            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-neutral-800 text-[10px] uppercase tracking-widest text-neutral-300">
              ✓ Completed
            </div>
          )}
        </section>

        {/* ─── Progress bar for context ─── */}
        <div className="mb-8">
          <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(dayNum / 60) * 100}%` }}
            />
          </div>
        </div>

        {/* ─── Mission ─── */}
        <section
          className="mb-6 rounded-2xl p-6 md:p-8 border border-neutral-800/60"
          style={{
            background: 'linear-gradient(160deg, #0e0e0e, #090909)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.03)',
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Today's Mission</p>
          <p className="text-neutral-200 text-[15px] leading-relaxed mb-6">{challenge.mission}</p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Requirements</p>
          <ul className="space-y-2.5">
            {challenge.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? 'border-neutral-500 bg-neutral-700 text-white'
                    : 'border-neutral-700'
                }`}>
                  {isCompleted && <span className="text-[10px]">✓</span>}
                </span>
                <span className="text-neutral-300 text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Streak & Context ─── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl p-5 border border-neutral-800/60 bg-[#0a0a0a]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Streak</p>
            <p className="text-2xl font-extrabold text-white">{user.streak} days</p>
          </div>
          <div className="rounded-2xl p-5 border border-neutral-800/60 bg-[#0a0a0a]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Completed</p>
            <p className="text-2xl font-extrabold text-white">{user.completedDays.length} / 60</p>
          </div>
        </div>

        {/* ─── Submit Proof ─── */}
        {!isCompleted && (
          <section
            className="mb-6 rounded-2xl p-6 md:p-8 border border-neutral-800/60"
            style={{
              background: 'linear-gradient(160deg, #0e0e0e, #090909)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.03)',
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Submit Proof of Work</p>

            <div className="space-y-4 mb-6">
              {/* GitHub */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-1.5">
                  GitHub Repository / Commit URL
                </label>
                <input
                  value={github}
                  onChange={(e) => { setGithub(e.target.value); setErrors({ ...errors, github: undefined }); }}
                  placeholder="https://github.com/username/repo"
                  className={`w-full bg-[#080808] border text-white placeholder:text-neutral-700 px-4 py-3.5 rounded-xl focus:outline-none transition-colors text-[15px] ${
                    errors.github ? 'border-neutral-500' : 'border-neutral-800 focus:border-neutral-600'
                  }`}
                />
                {errors.github && <p className="text-neutral-400 text-xs mt-1">{errors.github}</p>}
              </div>

              {/* LinkedIn */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-1.5">
                  LinkedIn Post URL
                </label>
                <input
                  value={linkedin}
                  onChange={(e) => { setLinkedin(e.target.value); setErrors({ ...errors, linkedin: undefined }); }}
                  placeholder="https://linkedin.com/posts/..."
                  className={`w-full bg-[#080808] border text-white placeholder:text-neutral-700 px-4 py-3.5 rounded-xl focus:outline-none transition-colors text-[15px] ${
                    errors.linkedin ? 'border-neutral-500' : 'border-neutral-800 focus:border-neutral-600'
                  }`}
                />
                {errors.linkedin && <p className="text-neutral-400 text-xs mt-1">{errors.linkedin}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-neutral-100 active:scale-[0.98] transition-all"
            >
              Submit Today's Work →
            </button>

            <p className="text-neutral-700 text-[10px] text-center mt-3">
              Drafts are saved automatically
            </p>
          </section>
        )}

        {/* ─── Already submitted view ─── */}
        {isCompleted && !submitted && (
          <section className="mb-6 rounded-2xl p-6 border border-neutral-800/60 bg-[#0a0a0a]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Submission</p>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">GitHub</p>
                <a href={user.submissions[dayNum]?.github} target="_blank" rel="noopener noreferrer"
                  className="text-white text-sm underline underline-offset-2 hover:text-neutral-300 break-all">
                  {user.submissions[dayNum]?.github}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">LinkedIn</p>
                <a href={user.submissions[dayNum]?.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-white text-sm underline underline-offset-2 hover:text-neutral-300 break-all">
                  {user.submissions[dayNum]?.linkedin}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ─── Day 60 final screen ─── */}
        {dayNum === 60 && isCompleted && (
          <section className="rounded-3xl p-8 md:p-10 border border-neutral-700 bg-[#0a0a0a] text-center">
            <p className="text-5xl mb-4">✦</p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              60 DAYS COMPLETE.
            </h2>
            <p className="text-neutral-400 text-base mb-6">
              You built the habit. Now show the world what you built.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <p className="text-2xl font-bold text-white">{user.completedDays.length}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Challenges</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{user.streak}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{Object.keys(user.submissions).length}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Proofs</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-white text-black font-bold rounded-xl"
            >
              View Full Journey →
            </button>
          </section>
        )}

        {/* ─── Navigation between days ─── */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => dayNum > 1 && navigate(`/challenge/${dayNum - 1}`)}
            disabled={dayNum <= 1}
            className="text-sm text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Day {dayNum - 1}
          </button>
          <button
            onClick={() => dayNum < 60 && navigate(`/challenge/${dayNum + 1}`)}
            disabled={dayNum >= 60}
            className="text-sm text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Day {dayNum + 1} →
          </button>
        </div>
      </div>
    </main>
  );
}
