import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import Card from '../../components/Cards';
import { order } from '../../interfaces/order';

interface datatype {
   orders: order[];
}
const Incoming: React.FC<{ Push: () => void }> = ({ Push }) => {
   const history = useHistory();
   const { data, error } = useFetch<datatype>(
      `${process.env.REACT_APP_SERVER}/admin/orders`,
   );
   if (error) {
      history.push('/admin');
   }
   function submitForm(e: MouseEvent) {
      e.preventDefault();
      axios
         .post(`${process.env.REACT_APP_SERVER}/admin/update`, {
            headers: {
               jwt: localStorage.getItem('jwt'),
            },
            body: data?.orders,
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
                  {data.orders.map((order, index) => (
                     <Card key={index} order={order} delivered={true} />
                  ))}
               </div>
               {data.orders.length !== 0 && (
                  <button
                     onClick={submitForm}
                     className="btn btn-primary ms-2 mt-5"
                  >
                     Done
                  </button>
               )}
               {data.orders.length === 0 && (
                  <h3 className="display-6 ms-4">
                     All Orders have been delivered
                  </h3>
               )}
            </>
         )}
      </div>
   );
};

export default Incoming;
