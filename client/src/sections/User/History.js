import Navbar from './Navbar';
import useFetch from '../../Hooks/useFetch';
import Card from '../../components/Cards';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import Modal from '../../../node_modules/bootstrap/js/src/modal';
import Loading from '../../components/Loading';
import Rate from '../../components/Rate';

const History = () => {
   const history = useHistory();
   const modalRef = useRef();
   const [data, error] = useFetch(
      `${process.env.REACT_APP_SERVER}/api/history`,
   );
   if (error) {
      history.push('/');
   }
   useEffect(() => {
      const myModal = new Modal(modalRef.current);
      if (!localStorage.getItem('popup')) {
         myModal.toggle();
         localStorage.setItem(
            'popup',
            'Delete this if you want the modal to drop again :)',
         );
      }
   }, []);
   return (
      <>
         <Navbar />
         <div ref={modalRef} className="modal fade" tabIndex="-1">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Rate us!</h5>
                     <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>
                  <div className="modal-body">
                     <p>
                        Thank you for using Quickstart. Please leave a rating of
                        your experience so far. Your name will be recorded and
                        would be available to the public
                     </p>
                  </div>
                  <div className="modal-footer">
                     <a href="/rating" className="btn btn-primary ms-2">
                        Rate app
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-md mb-3" style={{ marginTop: '10vh' }}></div>
         {data && data.data.orders.length === 0 && (
            <div className="container-md">
               <p className="display-6 text-dark">No delivered orders yet!</p>
            </div>
         )}
         {data && data.data.orders.length !== 0 && (
            <div className="container-md">
               <p className="display-6 text-dark">
                  History of your past orders
               </p>
               {data.data.orders.map(order => (
                  <Card info={true} order={order} key={order._id} />
               ))}
            </div>
         )}
         {!data && <Loading />}
         <Rate />
      </>
   );
};

export default History;
