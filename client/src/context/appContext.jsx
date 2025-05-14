import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// 1. Create the context
export const AppContent = createContext();

// 2. Create the provider component
export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      toast.error(error?.response?.data?.message || "Auth check failed");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching user data");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
