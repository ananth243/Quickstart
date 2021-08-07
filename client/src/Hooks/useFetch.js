import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get(url,{
        headers:{
          "jwt":localStorage.getItem("jwt")
        }
      })
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
  }, [url]);

  return [data, error];
};

export default useFetch;