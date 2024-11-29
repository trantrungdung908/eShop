import { useState } from "react";

const useMutation = (promiseApi) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const fetchData = async (payload, options) => {
    setLoading(true);
    const { onSuccess, onError } = options || {};

    try {
      const res = await promiseApi(payload);

      if (res?.fullData) {
        setData(res?.fullData);
        onSuccess?.(res?.fullData);
      }
    } catch (error) {
      const { message } = error;
      setError(message);
      onError?.(message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  return {
    data,
    loading,
    error,
    fetchApi: fetchData,
  };
};

export default useMutation;
