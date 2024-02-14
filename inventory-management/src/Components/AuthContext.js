import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');
  const [userBranch, setUserBranch] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserBranch = localStorage.getItem('userBranch')
    if (storedUserRole && storedUserBranch) {
      setUserRole(storedUserRole);
      setUserBranch(storedUserBranch)
    }
  }, []);

  const isAdmin = () => userRole === 'admin';

  const login = async (username, password) => {
    try {
      // Make an API call to authenticate the user
      const response = await axios.post('http://localhost:8000/auth/login', { username, password });
      const { token } = response.data;  
      // Save the authentication token to local storage
      localStorage.setItem('authToken', token);
  
      // After successful login, fetch user role by username
      const roleResponse = await axios.get(`http://localhost:8000/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      const role = roleResponse.data.role;
      const branch = roleResponse.data.branch;
      console.log("branch: "+ branch)
      // Update user role in state and localStorage
      setUserRole(role);
      setUserBranch(branch);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userBranch', branch);
    } catch (error) {
      // Handle authentication error
      console.error('Error logging in:', error);
      alert("Invalid credentials")
      // Optionally, you can show an error message to the user
    }
  };
  

  const logout = () => {
    // Clear user role in state
    setUserRole('');
    // Remove user role from localStorage
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ userRole, isAdmin, login, logout, userBranch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
