import React from 'react';

const Rate = () => {
   return (
      <div className="fixed-bottom d-flex justify-content-end me-3 mb-2">
         <a
            href="/rating"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Rate us!"
         >
            <i className="bi bi-star-fill"></i>
         </a>
      </div>
   );
};

export default Rate;
