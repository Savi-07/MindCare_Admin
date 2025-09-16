"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "admin" | "counsellor" | "collegeRep" | null;
  userCollege: string | null;
  login: (
    username: string,
    password: string,
    role: "admin" | "counsellor" | "collegeRep",
    college?: string
  ) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<
    "admin" | "counsellor" | "collegeRep" | null
  >(null);
  const [userCollege, setUserCollege] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const authStatus = localStorage.getItem("user_authenticated");
    const role = localStorage.getItem("user_role") as
      | "admin"
      | "counsellor"
      | "collegeRep"
      | null;
    const college = localStorage.getItem("user_college");
    if (authStatus === "true" && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserCollege(college);
    }
    setIsLoading(false);
  }, []);

  const login = (
    username: string,
    password: string,
    role: "admin" | "counsellor" | "collegeRep",
    college?: string
  ): boolean => {
    // Default credentials for admin, counsellor and college rep
    const isAdmin =
      username === "admin" && password === "admin" && role === "admin";
    const isCounsellor =
      username === "counsellor" &&
      password === "counsellor" &&
      role === "counsellor";
    const isCollegeRep =
      role === "collegeRep" &&
      username === "collegeRep" &&
      password === "collegeRep" &&
      !!college;

    if (isAdmin || isCounsellor || isCollegeRep) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserCollege(isCollegeRep ? college! : null);
      localStorage.setItem("user_authenticated", "true");
      localStorage.setItem("user_role", role);
      if (isCollegeRep && college) {
        localStorage.setItem("user_college", college);
      } else {
        localStorage.removeItem("user_college");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserCollege(null);
    localStorage.removeItem("user_authenticated");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_college");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userCollege,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
