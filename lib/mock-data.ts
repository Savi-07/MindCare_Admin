// Mock data for the counseling dashboard prototype

export interface User {
  id: string
  name: string
  email: string
  college: string
  location: string
  isTakingCounseling: boolean
  riskLevel: "low" | "medium" | "high"
  lastSessionDate?: string
  testScores: {
    anxiety: number
    depression: number
    stress: number
  }
}

export interface Feedback {
  id: string
  userId: string
  userName: string
  rating: number
  comments: string
  date: string
  sentiment: "positive" | "negative" | "neutral"
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ishi11",
    email: "ishita@university.edu",
    college: "Heritage",
    location: "Kolkata",
    isTakingCounseling: true,
    riskLevel: "medium",
    lastSessionDate: "2024-01-15",
    testScores: { anxiety: 30, depression: 20, stress: 34 },
  },
  {
    id: "2",
    name: "Aj07",
    email: "arjun@university.edu",
    college: "MSIT",
    location: "kolkata",
    isTakingCounseling: false,
    riskLevel: "low",
  testScores: { anxiety: 25, depression: 15, stress: 30 },
  },
  {
    id: "3",
    name: "Prizz",
    email: "priya@university.edu",
    college: "MSIT",
    location: "Kolkata",
    isTakingCounseling: true,
    riskLevel: "high",
    lastSessionDate: "2024-01-20",
  testScores: { anxiety: 34, depression: 34, stress: 34 },
  },
  {
    id: "4",
    name: "Viking12",
    email: "vivek@university.edu",
    college: "Asansol Engineering College",
    location: "Asansol",
    isTakingCounseling: true,
    riskLevel: "medium",
    lastSessionDate: "2024-01-18",
  testScores: { anxiety: 28, depression: 32, stress: 29 },
  },
  {
    id: "5",
    name: "Adi99",
    email: "aditya@university.edu",
    college: "MSIT",
    location: "Kolkata",
    isTakingCounseling: false,
    riskLevel: "low",
  testScores: { anxiety: 20, depression: 18, stress: 22 },
  },
]

export const mockFeedback: Feedback[] = [
  {
    id: "1",
    userId: "1",
    userName: "Rotzz",
    rating: 5,
    comments: "The counseling sessions have been incredibly helpful. I feel much more supported.",
    date: "2024-01-15",
    sentiment: "positive",
  },
  {
    id: "2",
    userId: "3",
    userName: "Kk34",
    rating: 4,
    comments: "Good support system, though I wish there were more available time slots.",
    date: "2024-01-20",
    sentiment: "positive",
  },
  {
    id: "3",
    userId: "4",
    userName: "Mixxi",
    rating: 3,
    comments: "The sessions are okay, but I feel like I need more personalized attention.",
    date: "2024-01-18",
    sentiment: "neutral",
  },
  {
    id: "4",
    userId: "2",
    userName: "nancy01",
    rating: 2,
    comments: "I tried a session but it did not feel like the right fit for me.",
    date: "2024-01-10",
    sentiment: "negative",
  },
]

export interface AnonymousStudent {
  id: string
  anonymousId: string
  yearOfStudy: number
  traits: string[]
  lastSessionDate: string
  improvementScore: number
  counselorId: string
}

export interface CounsellingQueue {
  id: string
  queueNo: number
  anonymousId: string
  reason: string
  requestedDate: string
  priority: 'low' | 'medium' | 'high'
}

export interface TraitProgress {
  studentId: string
  trait: string
  year1: number
  year2: number
  year3: number
  year4: number
}

export const mockAnonymousStudents: AnonymousStudent[] = [
  {
    id: "1",
    anonymousId: "STU001",
    yearOfStudy: 2,
    traits: ["Anxiety", "Stress Management"],
    lastSessionDate: "2024-01-15",
    improvementScore: 75,
    counselorId: "counselor1"
  },
  {
    id: "2",
    anonymousId: "STU002",
    yearOfStudy: 3,
    traits: ["Depression", "Academic Pressure"],
    lastSessionDate: "2024-01-20",
    improvementScore: 68,
    counselorId: "counselor1"
  },
  {
    id: "3",
    anonymousId: "STU003",
    yearOfStudy: 1,
    traits: ["Social Anxiety", "Time Management"],
    lastSessionDate: "2024-01-18",
    improvementScore: 82,
    counselorId: "counselor1"
  },
  {
    id: "4",
    anonymousId: "STU004",
    yearOfStudy: 4,
    traits: ["Career Anxiety", "Relationship Issues"],
    lastSessionDate: "2024-01-22",
    improvementScore: 71,
    counselorId: "counselor1"
  },
  {
    id: "5",
    anonymousId: "STU005",
    yearOfStudy: 2,
    traits: ["Sleep Issues", "Motivation"],
    lastSessionDate: "2024-01-19",
    improvementScore: 65,
    counselorId: "counselor1"
  }
]

export const mockCounsellingQueue: CounsellingQueue[] = [
  {
    id: "1",
    queueNo: 1,
    anonymousId: "STU006",
    reason: "Academic stress",
    requestedDate: "2024-01-23",
    priority: "high"
  },
  {
    id: "2",
    queueNo: 2,
    anonymousId: "STU007",
    reason: "Relationship counseling",
    requestedDate: "2024-01-23",
    priority: "medium"
  },
  {
    id: "3",
    queueNo: 3,
    anonymousId: "STU008",
    reason: "Career guidance",
    requestedDate: "2024-01-24",
    priority: "low"
  },
  {
    id: "4",
    queueNo: 4,
    anonymousId: "STU009",
    reason: "Anxiety management",
    requestedDate: "2024-01-24",
    priority: "high"
  }
]

export const mockTraitProgress: TraitProgress[] = [
  {
    studentId: "STU001",
    trait: "Anxiety",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 3
  },
  {
    studentId: "STU001",
    trait: "Stress Management",
    year1: 7,
    year2: 5,
    year3: 3,
    year4: 2
  },
  {
    studentId: "STU002",
    trait: "Depression",
    year1: 9,
    year2: 7,
    year3: 5,
    year4: 4
  },
  {
    studentId: "STU002",
    trait: "Academic Pressure",
    year1: 8,
    year2: 6,
    year3: 4,
    year4: 3
  }
]

export const mockAnalytics = {
  usersByCollege: [
    { college: "MSIT", users: 45, counseling: 28 },
    { college: "Heritage", users: 38, counseling: 15 },
    { college: "Asansol Engineering College", users: 52, counseling: 35 },
    { college: "Techno Main ", users: 2, counseling: 1 },
  ],
  usersByLocation: [
    { location: "Kolkata", users: 65 },
    { location: "Asansol", users: 48 },
    { location: "Assam", users: 42 },
    { location: "Guwhati", users: 21 },
  ],
  testScoresTrend: [
    { month: "Sep", anxiety: 28, depression: 22, stress: 30 },
    { month: "Oct", anxiety: 30, depression: 18, stress: 32 },
    { month: "Nov", anxiety: 25, depression: 15, stress: 28 },
    { month: "Dec", anxiety: 20, depression: 12, stress: 24 },
    { month: "Jan", anxiety: 18, depression: 10, stress: 20 },
  ],
  flaggedCasesTrend: [
    { month: "Sep", cases: 8 },
    { month: "Oct", cases: 12 },
    { month: "Nov", cases: 6 },
    { month: "Dec", cases: 4 },
    { month: "Jan", cases: 3 },
  ],
  // Counsellor-specific analytics
  counsellorStats: {
    totalStudentsTreated: 156,
    activeStudents: 23,
    studentsInQueue: 4,
    averageImprovementScore: 72.5
  },
  studentsByYear: [
    { year: "1st Year", count: 8 },
    { year: "2nd Year", count: 12 },
    { year: "3rd Year", count: 15 },
    { year: "4th Year", count: 9 }
  ],
  commonIssues: [
    { issue: "Academic Stress", count: 18 },
    { issue: "Anxiety", count: 15 },
    { issue: "Depression", count: 12 },
    { issue: "Relationship Issues", count: 8 },
    { issue: "Career Anxiety", count: 6 }
  ],
  counsellorEffectiveness: [
    { year: "2021", improvementRate: 65 },
    { year: "2022", improvementRate: 72 },
    { year: "2023", improvementRate: 78 },
    { year: "2024", improvementRate: 82 }
  ]
}
