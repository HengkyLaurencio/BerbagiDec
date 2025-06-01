import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: number;
  email: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };  

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
