import { useEffect, useState } from "react";

export interface SessionData {
  token?: string;
  companyId?: string;
    userId?: string;
    selectedId?: string;
}

const useSessionData = (): SessionData => {
  const getSessionData = () => {
    try {
      const session = sessionStorage.getItem("userInfo"); // ✅ Read from 'userInfo'
      return session ? JSON.parse(session) : {};
    } catch {
      return {};
    }
  };

  const [sessionData, setSessionData] = useState<SessionData>(getSessionData);

  useEffect(() => {
    const handleSessionChange = () => {
      setSessionData(getSessionData());
    };

    // Listen to both storage event and a custom event
    window.addEventListener("storage", handleSessionChange);
    window.addEventListener("userInfoChange", handleSessionChange);

    return () => {
      window.removeEventListener("storage", handleSessionChange);
      window.removeEventListener("userInfoChange", handleSessionChange);
    };
  }, []);

  return sessionData;
};

export default useSessionData;
