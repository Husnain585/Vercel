import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useUser = () => {
  const { user, fetchUser, updateUser, deleteUser, changePassword, token } = useContext(GlobalContext);
  return { user, token, fetchUser, updateUser, deleteUser, changePassword };
};

export default useUser;
