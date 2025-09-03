import axios from "axios";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

export interface INotificationBoundary {
  title?: string;
}

interface NotificationBoundaryProps {
  children: ReactNode;
}

interface INotificationContext {
  setNotification: Dispatch<SetStateAction<INotificationBoundary>>;
}
const NotificationContext = createContext<INotificationContext | undefined>(
  undefined
);

export const useNotification = (): INotificationContext => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within an Notification boundary"
    );
  }
  return context;
};

const NotificationBoundary: React.FC<NotificationBoundaryProps> = ({
  children,
}) => {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <>
      <NotificationContext.Provider value={{ setNotification: () => {} }}>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationBoundary;
