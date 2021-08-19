import React from 'react';
import propTypes from 'prop-types';

const Card = ({ order, info, delivered = false }) => {
   return (
      <div
         className="card"
         style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}
      >
         <div className={`card-header ${info ? 'text-white bg-info' : ' '}`}>
            {order.rest_name}
         </div>
         <div className="card-body">
            <h5 className="card-title">Name: {order.user_id}</h5>
            <h6 className="card-title">Address: {order.address}</h6>
            <table className="card-text table table-borderless">
               <thead>
                  <tr>
                     <th scope="col">S.No</th>
                     <th scope="col">Item</th>
                     <th scope="col">Quantity</th>
                     <th scope="col">Cost (In &#8377;)</th>
                  </tr>
               </thead>
               <tbody>
                  {order.items.map((item, index) => (
                     <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.cost}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <h6 className="card-title">
               Ordered At: {order.createdAt.slice(11, 19)},
               {order.createdAt.slice(2, 10)}
            </h6>
            <h6 className="card-title">
               Delivered at: {order.updatedAt.slice(11, 19)},{' '}
               {order.updatedAt.slice(2, 10)}
            </h6>
            <h6 className="card-title">Total Cost: &#8377;{order.total}</h6>
         </div>
         {delivered && (
            <div className="card-footer">
               <div className="form-check">
                  <input
                     onClick={() => {
                        order.delivered = order.delivered === 0 ? 1 : 0;
                     }}
                     className="form-check-input"
                     type="checkbox"
                     id="flexCheckDefault"
                  />
                  <label
                     className="form-check-label"
                     htmlFor="flexCheckDefault"
                  >
                     Delivered
                  </label>
               </div>
            </div>
         )}
      </div>
   );
};

Card.propTypes = {
   order: propTypes.arrayOf({
      rest_name: propTypes.string,
      user_id: propTypes.string,
      address: propTypes.string,
      items: propTypes.arrayOf({
         name: propTypes.string,
         quantity: propTypes.number,
         cost: propTypes.number,
      }),
      createdAt: propTypes.string,
      updatedAt: propTypes.string,
      delivered: propTypes.number,
      total: propTypes.total,
   }),
   info: propTypes.bool,
   delivered: propTypes.bool,
};

export default Card;
