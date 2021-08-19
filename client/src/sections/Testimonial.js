import Testament from '../components/Testimonial';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../img/Quickstart.png';
import { useHistory } from 'react-router-dom';

const Testimonial = () => {
   const [data, setData] = useState(null);
   const history = useHistory();
   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER}/testament`).then(res => {
         setData(res.data.testaments);
      });
   }, []);
   return (
      <div className="testimonial">
         <div className="navbar fixed-top bg-dark">
            <ul className="text-white w-100 d-flex justify-content-between">
               <li className="nav-item mt-4" onClick={() => history.push('/')}>
                  <button className="btn-light rounded-circle">
                     <i className="bi bi-arrow-left-circle"></i>
                  </button>
               </li>
               <li className="nav-item me-3">
                  QUICKSTART{' '}
                  <img
                     src={logo}
                     className="rounded-circle"
                     style={{ height: '5rem', width: '5rem' }}
                  />
               </li>
            </ul>
         </div>
         {data && (
            <>
               <h3
                  style={{
                     fontFamily: 'sans-serif',
                     color: 'white',
                     marginTop: '7rem',
                     marginLeft: '1rem',
                  }}
               >
                  The following are testaments from people that have used the
                  app
               </h3>
               <div className="mt-6">
                  {data.map(
                     testament =>
                        testament.comments !== '' && (
                           <Testament
                              testament={testament}
                              key={testament._id}
                           />
                        ),
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default Testimonial;
