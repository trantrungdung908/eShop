import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const useQuery = (promiseApi, dependencies = []) => {
  const { messageApi } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const fetchData = async (payload) => {
    try {
      const res = await promiseApi(payload);
      if (res?.fullData) {
        setData(res?.fullData);
      }
    } catch (error) {
      const { message } = error;
      setError(message);
      messageApi.error(`${message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);
  return {
    data,
    loading,
    error,
    refetchApi: fetchData,
  };
};

export default useQuery;
