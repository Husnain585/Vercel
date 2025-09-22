// src/hooks/useOrders.js
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.get("/order");
        setOrders(res.data.orders || res.data); // support both shapes
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
