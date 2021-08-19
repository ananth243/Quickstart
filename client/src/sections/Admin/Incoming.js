import React from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import Card from '../../components/Cards';
import { func } from 'prop-types';

const Incoming = ({ Push }) => {
   const history = useHistory();
   const [data, error] = useFetch(
      `${process.env.REACT_APP_SERVER}/admin/orders`,
   );
   if (error) {
      history.push('/admin');
   }
   function submitForm(e) {
      e.preventDefault();
      axios
         .post(`${process.env.REACT_APP_SERVER}/admin/update`, {
            headers: {
               jwt: localStorage.getItem('jwt'),
            },
            body: data.data.orders,
         })
         .then(() => {
            Push();
         })
         .catch(() => history.push('/admin'));
   }
   return (
      <div>
         {data && (
            <>
               <div className="container-fluid">
                  {data.data.orders.map((order, index) => (
                     <Card key={index} order={order} delivered={true} />
                  ))}
               </div>
               {data.data.orders.length !== 0 && (
                  <button
                     onClick={submitForm}
                     className="btn btn-primary ms-2 mt-5"
                  >
                     Done
                  </button>
               )}
               {data.data.orders.length === 0 && (
                  <h3 className="display-6 ms-4">
                     All Orders have been delivered
                  </h3>
               )}
            </>
         )}
      </div>
   );
};

Incoming.propTypes = {
   Push: func,
};

export default Incoming;
