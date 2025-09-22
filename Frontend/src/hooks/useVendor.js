import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useVendor = () => {
  const {createVendor, fetchVendors, fetchVendorProducts} = useContext(GlobalContext);
  return {createVendor, fetchVendorProducts, fetchVendors};
}

export default useVendor