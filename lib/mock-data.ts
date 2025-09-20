// Mock data for the counseling dashboard prototype

export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  location: string;
  isTakingCounseling: boolean;
  riskLevel: "low" | "medium" | "high";
  lastSessionDate?: string;
  testScores: {
    anxiety: number;
    depression: number;
    generalHealth: number;
    ocd: number;
    sud: number;
  };
  yearOfStudy?: number;
  branch?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comments: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "user_94bdb42d3df6",
    email: "user1@heritage.edu",
    college: "Heritage",
    location: "Kolkata",
    isTakingCounseling: true,
    riskLevel: "medium",
    lastSessionDate: "2024-01-15",
    testScores: { anxiety: 15, depression: 10, generalHealth: 18, ocd: 25, sud: 18 },
    yearOfStudy: 1,
    branch: "CSE",
  },
  {
    id: "2",
    name: "user_12acde98f4a1",
    email: "user2@msit.edu",
    college: "Meghnad Saha Institute of Technology",
    location: "Kolkata",
    isTakingCounseling: false,
    riskLevel: "low",
    testScores: { anxiety: 12, depression: 9, generalHealth: 14, ocd: 18, sud: 12 },
    yearOfStudy: 2,
    branch: "IT",
  },
  {
    id: "3",
    name: "user_a17bd4c93e2f",
    email: "user3@msit.edu",
    college: "Meghnad Saha Institute of Technology",
    location: "Kolkata",
    isTakingCounseling: true,
    riskLevel: "high",
    lastSessionDate: "2024-01-20",
    testScores: { anxiety: 19, depression: 20, generalHealth: 21, ocd: 35, sud: 24 },
    yearOfStudy: 3,
    branch: "ECE",
  },
  {
    id: "4",
    name: "user_c83de29b71af",
    email: "user4@aec.edu",
    college: "Asansol Engineering College",
    location: "Asansol",
    isTakingCounseling: true,
    riskLevel: "medium",
    lastSessionDate: "2024-01-18",
    testScores: { anxiety: 16, depression: 17, generalHealth: 15, ocd: 28, sud: 20 },
    yearOfStudy: 4,
    branch: "ME",
  },
  {
    id: "5",
    name: "user_f29d8e1a64bc",
    email: "user5@msit.edu",
    college: "Meghnad Saha Institute of Technology",
    location: "Kolkata",
    isTakingCounseling: false,
    riskLevel: "low",
    testScores: { anxiety: 8, depression: 7, generalHealth: 9, ocd: 12, sud: 8 },
    yearOfStudy: 1,
    branch: "CSE",
  },
  // Additional dummy users across listed colleges
  ...[
    "University of Delhi",
    "Jawaharlal Nehru University",
    "Indian Institute of Technology Delhi",
    "Jamia Millia Islamia",
    "Guru Gobind Singh Indraprastha University",
    "Ambedkar University Delhi",
    "Delhi Technological University",
    "Netaji Subhas University of Technology",
    "Meghnad Saha Institute of Technology",
  ].flatMap((collegeName, idx) =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: `${idx + 10}-${i + 1}`,
      name: `user_${Math.random().toString(36).substring(2, 14)}`,
      email: `user${idx}${i}@${collegeName.replace(/\s+/g, "").toLowerCase()}.edu`,
      college: collegeName,
      location:
        collegeName === "Meghnad Saha Institute of Technology" ? "Kolkata" : "Delhi",
      isTakingCounseling: (i + idx) % 2 === 0,
      riskLevel: ((i + idx) % 5 === 0
        ? "high"
        : (i + idx) % 3 === 0
        ? "medium"
        : "low") as "low" | "medium" | "high",
      lastSessionDate: "2024-01-1" + ((i % 9) + 1),
      testScores: {
        anxiety: ((i * 7 + idx * 3) % 22),
        depression: ((i * 5 + idx * 4) % 22),
        generalHealth: ((i * 9 + idx * 2) % 22),
        ocd: ((i * 11 + idx * 5) % 41),
        sud: ((i * 13 + idx * 7) % 28),
      },
      yearOfStudy: ((i % 4) + 1),
      branch: ["CSE", "IT", "ECE", "ME"][(i + idx) % 4],
    }))
  ),
];

export const mockFeedback: Feedback[] = [
  {
    id: "1",
    userId: "1",
    userName: "user_a1b2c3d4e5f6",
    rating: 5,
    comments: "The counseling sessions have been incredibly helpful. I feel much more supported.",
    date: "2024-01-15",
    sentiment: "positive",
  },
  {
    id: "2",
    userId: "3",
    userName: "user_b2c3d4e5f6a7",
    rating: 4,
    comments: "Good support system, though I wish there were more available time slots.",
    date: "2024-01-20",
    sentiment: "positive",
  },
  {
    id: "3",
    userId: "4",
    userName: "user_c3d4e5f6a7b8",
    rating: 3,
    comments: "The sessions are okay, but I feel like I need more personalized attention.",
    date: "2024-01-18",
    sentiment: "neutral",
  },
  {
    id: "4",
    userId: "2",
    userName: "user_d4e5f6a7b8c9",
    rating: 2,
    comments: "I tried a session but it did not feel like the right fit for me.",
    date: "2024-01-10",
    sentiment: "negative",
  },
  {
    id: "5",
    userId: "2",
    userName: "user_12acde98f4a1",
    rating: 4,
    comments: "Helpful resources and quick session scheduling for Meghnad Saha Institute of Technology.",
    date: "2024-01-12",
    sentiment: "positive",
  },
  {
    id: "6",
    userId: "3",
    userName: "user_a17bd4c93e2f",
    rating: 5,
    comments: "Great support from counsellors, noticeable improvement.",
    date: "2024-01-21",
    sentiment: "positive",
  },
  {
    id: "7",
    userId: "5",
    userName: "user_f29d8e1a64bc",
    rating: 3,
    comments: "Good, but would prefer more weekend slots.",
    date: "2024-01-16",
    sentiment: "neutral",
  },
];

export interface AnonymousStudent {
  id: string;
  anonymousId: string;
  yearOfStudy: number;
  traits: string[];
  lastSessionDate: string;
  improvementScore: number;
  counselorId: string;
}

export interface CounsellingQueue {
  id: string;
  queueNo: number;
  anonymousId: string;
  reason: string;
  requestedDate: string;
  priority: "low" | "medium" | "high";
}

export interface TraitProgress {
  studentId: string;
  trait: string;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
}

export const mockAnonymousStudents: AnonymousStudent[] = [
  {
    id: "1",
    anonymousId: "user_11aa22bb33cc",
    yearOfStudy: 2,
    traits: ["Anxiety", "Stress Management"],
    lastSessionDate: "2024-01-15",
    improvementScore: 75,
    counselorId: "counselor1",
  },
  {
    id: "2",
    anonymousId: "user_22bb33cc44dd",
    yearOfStudy: 3,
    traits: ["Depression", "Academic Pressure"],
    lastSessionDate: "2024-01-20",
    improvementScore: 68,
    counselorId: "counselor1",
  },
  {
    id: "3",
    anonymousId: "user_33cc44dd55ee",
    yearOfStudy: 1,
    traits: ["Social Anxiety", "Time Management"],
    lastSessionDate: "2024-01-18",
    improvementScore: 82,
    counselorId: "counselor1",
  },
  {
    id: "4",
    anonymousId: "user_44dd55ee66ff",
    yearOfStudy: 4,
    traits: ["Career Anxiety", "Relationship Issues"],
    lastSessionDate: "2024-01-22",
    improvementScore: 71,
    counselorId: "counselor1",
  },
  {
    id: "5",
    anonymousId: "user_55ee66ff77gg",
    yearOfStudy: 2,
    traits: ["Sleep Issues", "Motivation"],
    lastSessionDate: "2024-01-19",
    improvementScore: 65,
    counselorId: "counselor1",
  },
];

export const mockCounsellingQueue: CounsellingQueue[] = [
  {
    id: "1",
    queueNo: 1,
    anonymousId: "user_66ff77gg88hh",
    reason: "Academic stress",
    requestedDate: "2024-01-23",
    priority: "high",
  },
  {
    id: "2",
    queueNo: 2,
    anonymousId: "user_77gg88hh99ii",
    reason: "Relationship counseling",
    requestedDate: "2024-01-23",
    priority: "medium",
  },
  {
    id: "3",
    queueNo: 3,
    anonymousId: "user_88hh99ii00jj",
    reason: "Career guidance",
    requestedDate: "2024-01-24",
    priority: "low",
  },
  {
    id: "4",
    queueNo: 4,
    anonymousId: "user_99ii00jj11kk",
    reason: "Anxiety management",
    requestedDate: "2024-01-24",
    priority: "high",
  },
];

export const mockTraitProgress: TraitProgress[] = [
  {
    studentId: "user_11aa22bb33cc",
    trait: "Anxiety",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 3,
  },
  {
    studentId: "user_11aa22bb33cc",
    trait: "Stress Management",
    year1: 7,
    year2: 5,
    year3: 3,
    year4: 2,
  },
  {
    studentId: "user_22bb33cc44dd",
    trait: "Depression",
    year1: 9,
    year2: 7,
    year3: 5,
    year4: 4,
  },
  {
    studentId: "user_22bb33cc44dd",
    trait: "Academic Pressure",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 3,
  },
  {
    studentId: "user_33cc44dd55ee",
    trait: "Social Anxiety",
    year1: 9,
    year2: 7,
    year3: 5,
    year4: 3,
  },
  {
    studentId: "user_33cc44dd55ee",
    trait: "Time Management",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 2,
  },
  {
    studentId: "user_44dd55ee66ff",
    trait: "Career Anxiety",
    year1: 7,
    year2: 5,
    year3: 3,
    year4: 2,
  },
  {
    studentId: "user_44dd55ee66ff",
    trait: "Relationship Issues",
    year1: 6,
    year2: 4,
    year3: 2,
    year4: 1,
  },
  {
    studentId: "user_55ee66ff77gg",
    trait: "Sleep Issues",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 3,
  },
  {
    studentId: "user_55ee66ff77gg",
    trait: "Motivation",
    year1: 7,
    year2: 5,
    year3: 3,
    year4: 2,
  },
];

export const mockAnalytics = {
  usersByCollege: [
    { college: "University of Delhi", users: 8, counseling: 4 },
    { college: "Jawaharlal Nehru University", users: 8, counseling: 4 },
    {
      college: "Indian Institute of Technology Delhi",
      users: 8,
      counseling: 4,
    },
    { college: "Jamia Millia Islamia", users: 8, counseling: 4 },
    {
      college: "Guru Gobind Singh Indraprastha University",
      users: 8,
      counseling: 4,
    },
    { college: "Ambedkar University Delhi", users: 8, counseling: 4 },
    { college: "Delhi Technological University", users: 8, counseling: 4 },
    {
      college: "Netaji Subhas University of Technology",
      users: 8,
      counseling: 4,
    },
    {
      college: "Meghnad Saha Institute of Technology",
      users: 11, // 8 generated + 3 individual users
      counseling: 6, // 4 generated + 2 individual users
    },
    { college: "Heritage", users: 9, counseling: 5 }, 
    { college: "Asansol Engineering College", users: 9, counseling: 5 }, 
  ],
  usersByLocation: [
    { location: "Kolkata", users: 65 },
    { location: "Asansol", users: 48 },
    { location: "Assam", users: 42 },
    { location: "Guwhati", users: 21 },
  ],
  testScoresTrend: [
    { month: "Sep", anxiety: 14, depression: 12, generalHealth: 15, ocd: 28, sud: 18 },
    { month: "Oct", anxiety: 13, depression: 10, generalHealth: 14, ocd: 26, sud: 16 },
    { month: "Nov", anxiety: 11, depression: 9, generalHealth: 12, ocd: 24, sud: 14 },
    { month: "Dec", anxiety: 9, depression: 8, generalHealth: 10, ocd: 22, sud: 12 },
    { month: "Jan", anxiety: 8, depression: 7, generalHealth: 9, ocd: 20, sud: 10 },
  ],
  flaggedCasesTrend: [
    { month: "Sep", cases: 8 },
    { month: "Oct", cases: 12 },
    { month: "Nov", cases: 6 },
    { month: "Dec", cases: 4 },
    { month: "Jan", cases: 3 },
  ],
  counsellorStats: {
    totalSessions: 35,
    scheduledSessions: 23,
    previousSessions: 12,
    averageImprovementScore: 72.5,
  },
  studentsByYear: [
    { year: "1st Year", count: 8 },
    { year: "2nd Year", count: 12 },
    { year: "3rd Year", count: 15 },
    { year: "4th Year", count: 9 },
  ],
  commonIssues: [
    { issue: "Academic Stress", count: 18 },
    { issue: "Anxiety", count: 15 },
    { issue: "Depression", count: 12 },
    { issue: "Relationship Issues", count: 8 },
    { issue: "Career Anxiety", count: 6 },
  ],
  counsellorEffectiveness: [
    { year: "2021", improvementRate: 65 },
    { year: "2022", improvementRate: 72 },
    { year: "2023", improvementRate: 78 },
    { year: "2024", improvementRate: 82 },
  ],
};

export const mockAggregates = {
  requestsByWeekdayHour: Array.from({ length: 7 }).map((_, d) =>
    Array.from({ length: 24 }).map((_, h) => ((d + 2) * (h % 6) + (h > 8 && h < 18 ? 6 : 2)) % 20)
  ),
  resourceUptake: [
    { resource: "Understanding Anxiety: A Student's Guide", recommended: 120, attended: 78 },
    { resource: "Mindfulness Meditation for Beginners", recommended: 85, attended: 52 },
    { resource: "শিক্ষার্থীদের জন্য মানসিক স্বাস্থ্য", recommended: 140, attended: 96 },
  ],

}
