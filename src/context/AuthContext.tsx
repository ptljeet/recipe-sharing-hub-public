'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  // Add more fields if needed
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUser = () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwt.decode(token) as User;
        if (decoded?.userId) {
          setUser(decoded);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = () => checkUser();

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login'); // Redirect to login page after logout
  };
  

  if (loading) return null;


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
