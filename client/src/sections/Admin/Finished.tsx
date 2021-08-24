import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Cards';
import useFetch from '../../Hooks/useFetch';
import { order } from '../../interfaces/order';

const Order: React.FC = () => {
   interface datatype {
      orders: order[];
   }

   const history = useHistory();
   const { data, error } = useFetch<datatype>(
      `${process.env.REACT_APP_SERVER}/admin/delivered`,
   );
   if (error) {
      history.push('/');
   }
   return (
      <div className="container-fluid">
         {data &&
            data.orders.map(order => (
               <Card info={false} key={order._id} order={order} />
            ))}
      </div>
   );
};

export default Order;
