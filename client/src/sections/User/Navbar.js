import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import offCanvas from '../../../node_modules/bootstrap/js/src/offcanvas';

const Navbar = () => {
   const [link, setLink] = useState('');
   const [user, setUser] = useState('');
   const history = useHistory();
   const navRef = useRef();
   const buttonRef = useRef();
   const links = [
      ['Placed Orders', '/orders'],
      ['Order History', '/delivered'],
      ['Rate us', '/rating'],
   ];
   function Logout(e) {
      e.preventDefault();
      localStorage.removeItem('jwt');
      history.push('/');
   }

   useEffect(() => {
      if (localStorage.getItem('jwt')) {
         let { user, img } = JSON.parse(
            atob(localStorage.getItem('jwt').split('.')[1]),
         );
         setLink(img);
         setUser(user);
         const canvas = new offCanvas(navRef.current);
         buttonRef.current.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            canvas.toggle();
         });
      } else {
         history.push('/');
      }
   }, []);
   return (
      <>
         <nav
            id="large"
            className="navbar d-flex justify-content-between navbar-expand-lg  bg-dark text-white bg-gradient fixed-top"
         >
            <ul className="navbar-nav">
               <li className="nav-item mobile">
                  <button
                     className="btn btn-light ms-sm-5 ms-2 btn-border-0"
                     aria-disabled="true"
                     aria-controls="example"
                     ref={buttonRef}
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
               </li>
               <li className="nav-item desktop">
                  <a
                     href="/app"
                     className="nav-link mt-2"
                     style={{
                        textTransform: 'uppercase',
                        color: 'white',
                        marginLeft: '5vw',
                     }}
                  >
                     Homepage
                  </a>
               </li>
               {links.map((pro, index) => (
                  <li className="nav-item desktop" key={index}>
                     <a
                        href={pro[1]}
                        className="nav-link mt-2"
                        style={{
                           textTransform: 'uppercase',
                           color: 'white',
                           marginLeft: '4vw',
                        }}
                     >
                        {pro[0]}
                     </a>
                  </li>
               ))}
               <li className="nav-item desktop log">
                  <a
                     href=""
                     onClick={Logout}
                     className="nav-link mt-2"
                     style={{
                        textTransform: 'uppercase',
                        color: 'white',
                        marginLeft: '4vw',
                     }}
                  >
                     Logout
                  </a>
               </li>
            </ul>
            <div
               className="border ps-2 pe-1 me-3 text-dark rounded-pill border-light border-3"
               style={{ background: 'white' }}
            >
               <h5
                  style={{
                     fontSize: '1.5rem',
                     fontFamily: 'Roboto',
                  }}
               >
                  {user}
                  <img
                     src={link}
                     style={{ height: '3rem' }}
                     className="rounded-circle ms-2"
                  />
               </h5>
            </div>
         </nav>
         <div
            ref={navRef}
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="example"
            aria-labelledby="label"
         >
            <div className="offcanvas-header container-fluid bg-secondary text-white">
               <h5 className="offcanvas-title" id="label">
                  <a href="/app" className="h5 text-white nav-link logo">
                     Quickstart
                  </a>
               </h5>
               <button
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-labelledby="label"
               ></button>
            </div>
            <div className="offcanvas-body bg-dark  text-white container-fluid">
               <nav className="navbar">
                  <p className="h6 lead ">
                     Welcome to Quickstart. <br />
                     Place your order quickly and have it delivered in 45
                     minute&apos;s notice.
                  </p>
                  <ul className="navbar-nav mt-4">
                     <div className="fs-5">
                        {links.map((pro, index) => (
                           <li className="nav-item" key={index}>
                              <a
                                 href={pro[1]}
                                 className="nav-link text-decoration-none text-white"
                              >
                                 {pro[0]}
                              </a>
                           </li>
                        ))}
                     </div>
                     <div>
                        <li>
                           <button
                              id="log-out"
                              onClick={Logout}
                              className="btn btn-light"
                           >
                              Log out
                           </button>
                        </li>
                     </div>
                  </ul>
               </nav>
            </div>
         </div>
      </>
   );
};

export default Navbar;
