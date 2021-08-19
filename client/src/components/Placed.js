import React from 'react';
import propTypes from 'prop-types';

const Placed = ({ order }) => {
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

Placed.propTypes = {
   order: propTypes.shape({
      name: propTypes.string,
      cost: propTypes.number,
      quantity: propTypes.number,
   }),
};

export default Placed;
