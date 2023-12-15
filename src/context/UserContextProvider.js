import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('email');
  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://hilarious-bat-boot.cyclic.app/app/v1/${email}`);
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error);

      }
      setLoading(false)
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{user, loading}}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
