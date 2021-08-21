import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const Callback = () => {
   const history = useHistory();
   let query = useQuery();
   useEffect(() => {
      axios
         .get(`${process.env.REACT_APP_SERVER}/auth/google/`, {
            headers: {
               token: query.get('code'),
            },
         })
         .then(res => {
            localStorage.setItem('jwt', res.data.jwt);
            history.push('/app');
         })
         .catch(() => {
            history.push('/');
         });
   });
   return (
      <div>
         <h1>Processing</h1>
      </div>
   );
};

export default Callback;
