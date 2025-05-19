import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const test = 42;
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      name: 'Luke Skywalker',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/6/67/Luke_Skywalker_-_Welcome_Banner_%28Cropped%29.jpg',
    });
  };

  const logout = () => setUser(null);

  const updateUserProfilePic = (url) => {
    setUser((prev) => {
      return { ...prev, profilePic: url };
    });
  };

  return (
    <AuthContext.Provider value={{ test, user, login, logout, updateUserProfilePic }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
