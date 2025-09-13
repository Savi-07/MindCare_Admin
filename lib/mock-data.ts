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
}
