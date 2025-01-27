import React, { createContext, useState, useContext } from 'react';

// Context Creation
export const Security = createContext();

// SecurityProvider Component
const SecurityProvider = ({ children }) => {
  // Retrieve login user data from localStorage
  const Login_user = localStorage.getItem("users");
  const [user, setUser] = useState(
    Login_user ? JSON.parse(Login_user) : null // Parse user data if available
  );

  return (
    <Security.Provider value={[{ user, setUser }]}>
      {children}
    </Security.Provider>
  );
};

export default SecurityProvider;

// Custom Hook to Use Security Context
export const use_user = () => useContext(Security);
