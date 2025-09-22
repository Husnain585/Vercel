import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useCategories = () => {
  const { categories, loadingCategories } = useContext(GlobalContext);

  return { categories, loadingCategories };
};

export default useCategories;
