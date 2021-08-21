import Navbar from './Navbar';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Items from '../../components/ItemCards';
import Placed from '../../components/Placed';
import Loading from '../../components/Loading';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const Orders = () => {
   const [orderArray, setOrderArray] = useState([]);
   const [order, setOrder] = useState('');
   const [address, setAddress] = useState(null);
   const query = useQuery();
   const history = useHistory();
   const id = query.get('id');
   const [total, setTotal] = useState(0);
   const addressRef = useRef();
   const [data, error] = useFetch(
      `${process.env.REACT_APP_SERVER}/api/order/${id}`,
   );
   if (error) {
      history.push('/');
   }
   function click(e) {
      let c = 0;
      orderArray.forEach(order => {
         if (order.name === e.target.id) {
            c = 1;
            order.quantity += 1;
         }
      });
      if (c === 0) {
         setOrderArray([
            ...orderArray,
            {
               name: e.target.id,
               cost: parseInt(e.target.value),
               quantity: 1,
            },
         ]);
      }
      setTotal(total + parseInt(e.target.value));
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (total === 0) {
         setOrder('You have not placed your order');
      } else {
         if (address === null || address === '') {
            addressRef.current.focus();
         } else {
            const { user, id } = JSON.parse(
               atob(localStorage.getItem('jwt').split('.')[1]),
            );
            axios
               .post(`${process.env.REACT_APP_SERVER}/api/order/${id}`, {
                  headers: {
                     jwt: localStorage.getItem('jwt'),
                  },
                  data: {
                     rest_name: data.data.rest_name,
                     _id: id,
                     orderArray,
                     user,
                     address,
                     total,
                  },
               })
               .then(() => {
                  history.push('/orders');
               })
               .catch(err => console.log(err));
         }
      }
   }
   return (
      <div>
         <Navbar />
         {data && (
            <>
               <div className="container-fluid mt-6 background">
                  <h2>{data.data.rest_name}</h2>
                  <p className="text-lead">
                     Address: {data.data.details.address}
                  </p>
                  <img
                     src={data.data.details.image}
                     alt={data.data.rest_name}
                     className="img-thumbnail border border-3 rounded"
                  />
                  <p className="text-muted ms-1 mt-4">
                     {data.data.details.description}
                  </p>
                  <p className="fs-2">Our Menu: </p>
               </div>
               <br />
               <div className="gallery ms-4 me-4">
                  {data.data.menu.map((food, i) => (
                     <Items key={i} food={food} click={click} />
                  ))}
               </div>
               <div className="container-fluid mt-5">
                  {total !== 0 && <h3 className="ms-4 mb-2">Your order: </h3>}
                  <form onSubmit={handleSubmit}>
                     <ul className="list-group addItem"></ul>
                     <ul>
                        {orderArray.map((order, j) => (
                           <Placed key={j} order={order} />
                        ))}
                     </ul>
                     <div
                        className={`input-group ms-3 mb-${total === 0 ? 5 : 3}`}
                        style={{ width: '97%' }}
                     >
                        <span className="input-group-text">
                           Your delivery address:
                        </span>
                        <textarea
                           ref={addressRef}
                           onChange={e => setAddress(e.target.value)}
                           style={{ height: '6rem' }}
                           className="form-control"
                           aria-label="With textarea"
                        ></textarea>
                     </div>
                     {total === 0 && order}
                     {total !== 0 && (
                        <>
                           <h2 className="text-danger ms-3 mt-2">
                              Your total is: &#8377;{total}
                           </h2>
                           <button className="btn btn-primary ms-4 mb-5">
                              Submit
                           </button>
                        </>
                     )}
                  </form>
               </div>
            </>
         )}
         {!data && <Loading />}
      </div>
   );
};

export default Orders;
