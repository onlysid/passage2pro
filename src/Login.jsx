import React, { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [password, setPassword] = useState(null);

  return (
    <AuthContext.Provider value={{ password, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginPage = () => {
  const { setPassword } = useContext(AuthContext);
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setPassword(enteredPassword);
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;