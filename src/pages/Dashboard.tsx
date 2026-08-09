import { useNavigate } from 'react-router-dom';
import { loadUser, getGreeting } from '../utils/storage';
import { challenges, milestones } from '../data/challenges';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = loadUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-neutral-500 text-sm uppercase tracking-widest mb-4">No active journey</p>
          <h2 className="text-3xl font-bold text-white mb-6">Start your 60-day journey</h2>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
          >
            Get Started →
          </button>
        </div>
      </main>
    );
  }

  const today = challenges.find((c) => c.day === user.currentDay) || challenges[0];
  const progress = Math.round((user.completedDays.length / 60) * 100);
  const isCompleted = user.completedDays.length >= 60;

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-32 px-5">
      <div className="max-w-2xl mx-auto">

        {/* ─── Header ─── */}
        <section className="mb-10">
          <p className="text-neutral-500 text-sm mb-1">{getGreeting()}, {user.name}.</p>
          <h1
            className="text-[clamp(48px,10vw,80px)] font-extrabold tracking-[-0.06em] text-white leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            DAY {user.currentDay} <span className="text-neutral-600">/ 60</span>
          </h1>

          {/* Progress bar */}
          <div className="mt-6 mb-4">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-white">{user.streak}</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Day Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{user.completedDays.length}</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{Object.keys(user.submissions).length}</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Submitted</p>
            </div>
          </div>
        </section>

        {/* ─── Today's Mission (PRIMARY) ─── */}
        {!isCompleted && (
          <section
            className="mb-8 rounded-3xl p-8 md:p-10 border border-neutral-800/60 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)',
              boxShadow: '0 24px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)',
            }}
          >
            <div className="absolute top-4 right-5 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-600">{today.track}</span>
              <span className="text-neutral-700">·</span>
              <span className="text-[10px] text-neutral-600">{today.duration}</span>
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">Today's Mission</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">{today.title}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-lg">{today.mission}</p>

            <button
              onClick={() => navigate(`/challenge/${today.day}`)}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-xl text-base hover:bg-neutral-100 active:scale-[0.98] transition-all"
            >
              Continue Challenge →
            </button>
          </section>
        )}

        {/* ─── Completed State ─── */}
        {isCompleted && (
          <section className="mb-8 rounded-3xl p-10 border border-neutral-700 text-center bg-[#0a0a0a]">
            <p className="text-5xl mb-4">✦</p>
            <h2 className="text-3xl font-extrabold text-white mb-2">60 DAYS COMPLETE</h2>
            <p className="text-neutral-400 text-sm">You built the habit. Now show the world what you built.</p>
          </section>
        )}

        {/* ─── Streak ─── */}
        <section className="mb-6 rounded-2xl p-6 border border-neutral-800/60 bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Streak</p>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                {user.streak > 0 ? `${user.streak} DAY${user.streak !== 1 ? 'S' : ''}` : 'Starts today'}
              </p>
            </div>
            <div className="text-5xl text-neutral-700">🔥</div>
          </div>
        </section>

        {/* ─── 60-Day Journey ─── */}
        <section className="mb-6 rounded-2xl p-6 border border-neutral-800/60 bg-[#0a0a0a]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">60-Day Journey</p>
          <div className="grid grid-cols-10 gap-1.5">
            {challenges.map((c) => {
              const isCompleted = user.completedDays.includes(c.day);
              const isCurrent = c.day === user.currentDay;
              const isMilestone = milestones[c.day];

              return (
                <button
                  key={c.day}
                  onClick={() => {
                    if (isCompleted || isCurrent) navigate(`/challenge/${c.day}`);
                  }}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono transition-all duration-200 ${
                    isCurrent
                      ? 'bg-white text-black font-bold ring-2 ring-white/30 scale-110'
                      : isCompleted
                      ? 'bg-neutral-700 text-neutral-200'
                      : 'bg-neutral-900 text-neutral-600'
                  }`}
                  title={isMilestone ? `Day ${c.day}: ${isMilestone}` : `Day ${c.day}`}
                >
                  {isCompleted ? '✓' : c.day}
                  {isMilestone && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Milestone labels */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(milestones).map(([day, label]) => {
              const d = parseInt(day);
              const reached = user.completedDays.includes(d);
              return (
                <span
                  key={day}
                  className={`text-[9px] px-2 py-1 rounded-full border ${
                    reached
                      ? 'border-neutral-600 text-neutral-300 bg-neutral-800'
                      : 'border-neutral-800 text-neutral-600'
                  }`}
                >
                  Day {day}: {label} {reached ? '✓' : ''}
                </span>
              );
            })}
          </div>
        </section>

        {/* ─── Proof of Work ─── */}
        <section className="mb-6 rounded-2xl p-6 border border-neutral-800/60 bg-[#0a0a0a]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Your Proof of Work</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'GitHub', value: `${Object.keys(user.submissions).length} commits`, icon: '⟐' },
              { label: 'LinkedIn', value: `${Object.keys(user.submissions).length} posts`, icon: '◈' },
              { label: 'Projects', value: `${user.completedDays.length} built`, icon: '◆' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-2xl text-neutral-600 block mb-2">{item.icon}</span>
                <p className="text-white font-bold text-lg">{item.value}</p>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Achievements ─── */}
        <section className="mb-6 rounded-2xl p-6 border border-neutral-800/60 bg-[#0a0a0a]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Achievements</p>
          {user.achievements.length === 0 ? (
            <p className="text-neutral-600 text-sm">Complete your first challenge to unlock achievements.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.achievements.filter(Boolean).map((a) => (
                <span
                  key={a}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-700 text-neutral-200 bg-neutral-800"
                >
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Locked achievements */}
          <div className="mt-3 flex flex-wrap gap-2">
            {['First Project', '7 Day Streak', '10 Commits', '15 Day Streak', '30 Day Streak', '60 Day Completion']
              .filter((a) => !user.achievements.includes(a))
              .map((a) => (
                <span
                  key={a}
                  className="px-3 py-1.5 rounded-full text-xs border border-neutral-800/40 text-neutral-700"
                >
                  🔒 {a}
                </span>
              ))}
          </div>
        </section>

      </div>
    </main>
  );
}
