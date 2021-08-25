import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Cards';
import useFetch from '../../Hooks/useFetch';
import Loading from '../../components/Loading';

const Order = () => {
   const history = useHistory();
   const [data, error] = useFetch(
      `${process.env.REACT_APP_SERVER}/admin/delivered`,
   );
   if (error) {
      history.push('/');
   }
   return (
      <div className="container-fluid">
         {data &&
            data.data.orders.map(order => (
               <Card key={order._id} order={order} />
            ))}
         {!data && <Loading />}
      </div>
   );
};

export default Order;
