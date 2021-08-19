import React from 'react';
import propTypes from 'prop-types';

const Restaurant = ({ restaurant, index }) => {
   return (
      <div className="accordion-item mt-3">
         <h2 className="accordion-header" id={`heading${index}`}>
            <button
               className={` bg-info text-white ${
                  index === 0
                     ? 'accordion-button'
                     : 'accordion-button collapsed'
               }`}
               type="button"
               data-bs-toggle="collapse"
               data-bs-target={`#collapse${index}`}
               aria-expanded={index === 0 ? 'true' : 'false'}
               aria-controls={`collapse${index}`}
            >
               {restaurant.rest_name}
            </button>
         </h2>
         <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${
               index === 0 ? 'show' : ''
            }`}
            aria-labelledby={`heading${restaurant._id}`}
            data-bs-parent="#accordion"
         >
            <div className="accordion-body">
               <div>
                  <strong>Address:</strong>
                  <p className="fst-italic lh-lg">
                     {restaurant.details.address}
                  </p>
               </div>
               <img className="img-fluid w-75" src={restaurant.details.image} />
               <p className="mt-3">{restaurant.details.description}</p>
            </div>
            <div className="accordion-footer ms-4 mb-4">
               <a
                  href={`/order?id=${restaurant._id}`}
                  className="btn btn-info text-white"
               >
                  Place your order!
               </a>
            </div>
         </div>
      </div>
   );
};

Restaurant.propTypes = {
   restaurant: propTypes.shape({
      rest_name: propTypes.string,
      _id: propTypes.string,
      details: propTypes.arrayOf({
         address: propTypes.string,
         image: propTypes.string,
         description: propTypes.string,
      }),
   }),
   index: propTypes.number,
};

export default Restaurant;
