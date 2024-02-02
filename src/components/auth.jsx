import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const HARDCODED_PASSWORD = 'your-hardcoded-password'; // replace with your actual hardcoded password

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password) => {
    if (password === HARDCODED_PASSWORD) {
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}