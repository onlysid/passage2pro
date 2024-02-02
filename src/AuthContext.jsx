import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [password, setPassword] = useState('');

  return (
    <AuthContext.Provider value={{ password, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};