import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

function useFetch<T>(url: string){
   const [data, setData] = useState<T | null>(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      axios
         .get(url, {
            headers: {
               jwt: localStorage.getItem('jwt'),
            },
         })
         .then((res: any) => {
            setData(res);
            setError(null);
         })
         .catch(err => {
            setError(err.message);
         });
   }, [url]);

   return [data, error];
};

export default useFetch;
