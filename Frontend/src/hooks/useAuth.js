import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useAuth = () => {
  const { user, setUser, token, setToken, loadingUser } =
    useContext(GlobalContext);

  return { user, setUser, token, setToken, loadingUser };
};

export default useAuth;
