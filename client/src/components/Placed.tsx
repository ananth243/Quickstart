import React from 'react';

interface order{
   name: string,
   cost: number,
   quantity: number
}
interface props{
   order: order
}
const Placed = (props: props) => {
   const {order} = props
   return (
      <>
         <li className="list-group-item d-flex justify-content-between align-items-center">
            <input
               type="text"
               disabled
               className="ms-4 bg-info text-white border-0 text-center"
               value={order.name}
            />
            <span className="badge bg-info rounded-pill">
               &#8377; {order.cost}
            </span>
            <span className="badge bg-info rounded-pill me-6">
               {order.quantity}
            </span>
         </li>
      </>
   );
};
export default Placed;
