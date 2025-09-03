import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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
  // const [isNotificationVisible, setNotification] =
  //     useState<INotificationBoundary>({
  //         status: false,
  //     })

  return (
    <>
      <NotificationContext.Provider value={{ setNotification: () => {} }}>
        {children}
      </NotificationContext.Provider>
      {/* <IRMSnackBar
                snackbarProps={{
                    open: isNotificationVisible.status,
                }}
                onClose={() => setNotification({ status: false })}
                status={isNotificationVisible.type}
                alertTitle={isNotificationVisible.title}
                message={isNotificationVisible?.message}
            /> */}
    </>
  );
};

export default NotificationBoundary;
