export interface UserData {
  name: string;
  email: string;
  track: string;
  currentDay: number;
  streak: number;
  completedDays: number[];
  submissions: Record<number, { github: string; linkedin: string }>;
  achievements: string[];
  drafts: { github?: string; linkedin?: string };
  lastActiveDate?: string;
}

const USER_KEY = 'abtalksUser';

export function loadUser(): UserData | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserData;
  } catch {
    return null;
  }
}

export function saveUser(user: UserData): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function createUser(name: string, email: string, track: string): UserData {
  return {
    name,
    email,
    track,
    currentDay: 1,
    streak: 0,
    completedDays: [],
    submissions: {},
    achievements: [],
    drafts: {},
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
}

export function completeDay(user: UserData, day: number, github: string, linkedin: string): UserData {
  const today = new Date().toISOString().split('T')[0];
  const completedDays = Array.from(new Set([...user.completedDays, day]));
  const submissions = { ...user.submissions, [day]: { github, linkedin } };
  
  let streak = user.streak;
  if (user.lastActiveDate !== today) {
    const lastDate = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    const todayDate = new Date(today);
    if (lastDate) {
      const diff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      streak = diff <= 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
  } else {
    streak = Math.max(streak, 1);
  }

  const achievements = [...user.achievements];
  if (day === 1 && !achievements.includes('First Project')) achievements.push('First Project');
  if (streak >= 7 && !achievements.includes('7 Day Streak')) achievements.push('7 Day Streak');
  if (completedDays.length >= 10 && !achievements.includes('10 Commits')) achievements.push('10 Commits');
  if (streak >= 15 && !achievements.includes('15 Day Streak')) achievements.push('15 Day Streak');
  if (streak >= 30 && !achievements.includes('30 Day Streak')) achievements.push('30 Day Streak');
  if (day === 60 && !achievements.includes('60 Day Completion')) achievements.push('60 Day Completion');

  return {
    ...user,
    completedDays,
    submissions,
    streak,
    currentDay: Math.min(day + 1, 60),
    achievements,
    lastActiveDate: today,
    drafts: {},
  };
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
