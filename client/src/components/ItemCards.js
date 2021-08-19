import React from 'react';
import propTypes from 'prop-types';

const Items = ({ food, click }) => {
   return (
      <div
         id={food._id}
         className="card border border-4 rounded "
         data-bs-toggle="toggle"
         data-bs-target={`#${food._id}`}
      >
         <img
            src={food.image}
            className="card-img-top img-fluid food "
            alt={food.name}
         />
         <div className="card-body">
            <p className="card-text text-lead text-align-center">
               {food.sort === 0 && (
                  <svg width="12.5" height="12.5" className="mb-1 me-1">
                     <circle cx="6.25" cy="6.25" r="5" fill="green" />
                     <rect
                        cx="6.25"
                        cy="6.25"
                        width="12.5"
                        height="12.5"
                        fill="none"
                        strokeWidth="0.75"
                        stroke="green"
                     />
                  </svg>
               )}
               {food.sort === 1 && (
                  <svg width="12.5" height="12.5" className="mb-1 me-1">
                     <circle cx="6.25" cy="6.25" r="5" fill="red" />
                     <rect
                        cx="6.25"
                        cy="6.25"
                        width="12.5"
                        height="12.5"
                        fill="none"
                        strokeWidth="0.75"
                        stroke="red"
                     />
                  </svg>
               )}
               {food.name}
            </p>
            <br />
            <p className="text-warning cost">
               Cost: &#8377;{food.cost}
               <button
                  className="ms-5 btn btn-primary"
                  id={food.name}
                  value={food.cost}
                  onClick={click}
               >
                  +
               </button>
            </p>
         </div>
      </div>
   );
};

Items.propTypes = {
   food: propTypes.arrayOf({
      id: propTypes.string,
      image: propTypes.string,
      name: propTypes.string,
      sort: propTypes.number,
   }),
   click: propTypes.func,
};

export default Items;
