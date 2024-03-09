import React, { useState, useMemo, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string | null;
  token: string | null;
}

const useLocalStorage = (keyName: string, defaultValue: User) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: User) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      /* empty */
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
interface AuthContextProps {
  user: User;
  login: (data: User) => void;
  logout: () => void;
}

const useAuthValue = (
  login: (data: User) => void,
  logout: () => void,
  user: User
): AuthContextProps => {
  return useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );
};

const AuthContext = createContext<AuthContextProps | null>(null);
const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useLocalStorage("user", { id: null, token: null });
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: User) => {
    setUser(data);
    navigate("/library");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useAuthValue(login, logout, user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
