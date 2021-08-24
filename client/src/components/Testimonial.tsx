import React from 'react';
import { FC } from 'react';
import { testaments } from '../interfaces/testament';
interface props {
   testament: testaments;
}

const Testaments: FC<props> = ({ testament }) => {
   return (
      <div className={`container-sm pb-3`}>
         <div className="card nohover mt-5">
            <div className="card-header d-flex justify-content-end">
               <strong className="mt-2">{testament._id}</strong>
               <img
                  src={testament.image}
                  className="rounded-circle ms-3"
                  style={{ height: '3rem' }}
               />
            </div>
            <div className="card-body">
               <blockquote className="blockquote mb-0">
                  <ul className="list-unstyled">
                     <li>
                        Rated overall experience: {testament.experience}/10
                     </li>
                     <li>Rated the food: {testament.food}/10</li>
                     <li>Rated delivvery: {testament.delivery}/10</li>
                  </ul>
                  <footer className="blockquote-footer">
                     {testament.comments}
                  </footer>
               </blockquote>
            </div>
         </div>
      </div>
   );
};

export default Testaments;
