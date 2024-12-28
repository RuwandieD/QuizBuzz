import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define Auth Context Types
type AuthContextType = {
  user: string | null;
  register: (username: string, password: string) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ [key: string]: string }>({}); // Registered users

  // Register User
  const register = (username: string, password: string) => {
    if (users[username]) return false; // Username already exists
    setUsers((prev) => ({ ...prev, [username]: password }));
    return true;
  };

  // Login User
  const login = (username: string, password: string) => {
    if (users[username] && users[username] === password) {
      setUser(username);
      return true;
    }
    return false;
  };

  // Logout User
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
