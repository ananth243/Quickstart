import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch<T>(url: string) {
   const [data, setData] = useState<null | T>(null);
   const [error, setError] = useState<null | string>(null);

   useEffect(() => {
      axios
         .get(url, {
            headers: {
               jwt: localStorage.getItem('jwt'),
            },
         })
         .then((res: any) => {
            setData(res.data);
            setError(null);
         })
         .catch(err => {
            setError(err.message);
         });
   }, [url]);

   return { data, error };
}

export default useFetch;
