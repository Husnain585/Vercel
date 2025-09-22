import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useAdmin = () => {
  const { getAllOrders, statusOrder, createProduct, createCategory } =
    useContext(GlobalContext);

  return { getAllOrders, statusOrder, createProduct, createCategory  };
};

export default useAdmin;
