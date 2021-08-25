import React, { useState } from 'react';
import Incoming from './Incoming';
import Finished from './Finished';
import { useHistory } from 'react-router-dom';
import logo from '../../img/Quickstart.png';
import Create from './CreateUser';

const Orders = () => {
   const [button1, setButton1] = useState(true);
   const [button2, setButton2] = useState(false);
   const [button3, setButton3] = useState(false);
   const [dropdown, setDropdown] = useState(false);
   const history = useHistory();

   function Logout() {
      localStorage.removeItem('jwt');
      history.push('/admin');
   }
   function Push() {
      setButton1(false);
      setButton3(false);
      setDropdown(false);
      setButton2(true);
   }
   return (
      <>
         <div className="fixed-top" style={{ background: '#36a9e3' }}>
            <nav id="large" className="navbar text-white">
               <ul className="w-100 list-unstyled">
                  <li className="nav-item">
                     <img
                        src={logo}
                        className="rounded-circle me-2"
                        style={{
                           height: '4rem',
                           width: '4rem',
                           marginLeft: '1.5rem',
                        }}
                     />
                     QUICKSTART
                  </li>
                  <li className="me-4 mt-3 nav-item">
                     <div className="dropdown">
                        <button
                           className="btn btn-secondary dropdown-toggle"
                           type="button"
                           id="dropdownMenuButton1"
                           onClick={() => setDropdown(!dropdown)}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              className="logo bi bi-list"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                              />
                           </svg>
                        </button>
                        {dropdown && (
                           <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                           >
                              <li
                                 className="hover dropdown-item"
                                 onClick={Logout}
                              >
                                 Logout
                              </li>
                              <li
                                 className="hover dropdown-item"
                                 onClick={() => {
                                    setButton3(true);
                                    setButton2(false);
                                    setButton1(false);
                                    setDropdown(false);
                                 }}
                              >
                                 New
                              </li>
                           </ul>
                        )}
                     </div>
                  </li>
               </ul>
            </nav>
            <div className="d-flex flex-wrap justify-content-center">
               <button
                  style={{
                     color: button1 ? 'black' : 'white',
                     background: button1 ? '#e2e1d6' : '#f2392c',
                     border: 'none',
                     textAlign: 'center',
                     minHeight: '2.5rem',
                     borderRadius: '1.5rem 1.5rem 0 0',
                  }}
                  className={`w-25`}
                  onClick={() => {
                     setButton1(true);
                     setButton3(false);
                     setDropdown(false);
                     setButton2(false);
                  }}
               >
                  Incoming Orders
               </button>
               <button
                  style={{
                     color: button2 ? 'black' : 'white',
                     background: button2 ? '#e2e1d6' : '#f2392c',
                     border: 'none',
                     textAlign: 'center',
                     borderRadius: '1.5rem 1.5rem 0 0',
                  }}
                  onClick={Push}
                  className={`h-auto ms-5 w-25`}
               >
                  {' '}
                  Delivered orders
               </button>
            </div>
         </div>
         <div style={{ marginTop: '12rem' }}>
            {button1 && <Incoming Push={Push} />}
            {button2 && <Finished />}
            {button3 && <Create />}
         </div>
      </>
   );
};

export default Orders;
