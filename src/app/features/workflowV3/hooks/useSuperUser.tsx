import { useMemo } from "react";


export const useSuperUser = () => {
  const userInfo = sessionStorage.getItem("userInfo");
  const { userId } = JSON.parse(userInfo);

  const isSuperUser = useMemo(() => {
    return ["superuser1", "superuser2"].includes(userId);
  }, [userId]);
  return isSuperUser;
};
