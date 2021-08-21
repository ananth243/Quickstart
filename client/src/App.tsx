import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './img/Quickstart.png';
import Credits from './sections/Credits';
import Canvas from './components/offCanvas';

function App() {
   interface rating{
      avgExperience: Number
   }
   const [data, setData] = useState<rating>({avgExperience: 10});
   useEffect(() => {
      axios
         .get(`${process.env.REACT_APP_SERVER}/ratings`)
         .then(res => {
            setData(res.data.ratings[0]);
         })
         .catch(err => console.log(err));
   }, []);

   return (
      <>
         <div className="App">
            {data && (
               <>
                  <div className="Navbar fixed-top">
                     <ul className="navbar-Nav">
                        <li className="nav-item">
                           Quickstart{' '}
                           <img
                              src={logo}
                              className="ms-2 rounded-circle"
                              style={{ height: '2.5rem', width: '2.5rem' }}
                           />
                        </li>
                        <div id="desktop">
                           <li className="nav-item">
                              <a
                                 className="nav-link text-white"
                                 href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT}%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=https%3A//www.googleapis.com/auth/userinfo.profile&prompt=consent`}
                                 role="button"
                              >
                                 Log In
                              </a>
                           </li>
                           <li className="nav-item">
                              {' '}
                              <a
                                 href="/testimonial"
                                 className="text-white nav-link"
                              >
                                 Testimonials
                                 <i className="bi bi-file-person"></i>
                              </a>
                           </li>
                           <li className="nav-item">
                              {' '}
                              <a
                                 href="#credits"
                                 className="text-white nav-link"
                              >
                                 Credits
                              </a>
                           </li>
                        </div>
                        <li
                           className="canvas"
                           style={{ marginRight: '2rem', marginTop: '0.1rem' }}
                        >
                           <button
                              className="btn btn-light"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                           >
                              <i className="bi bi-list"></i>
                           </button>
                        </li>
                     </ul>
                     <div
                        className="offcanvas offcanvas-end bg-light"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel"
                     >
                        <Canvas
                           header={'Welcome to Quicktart!'}
                           links={[
                              {
                                 link: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT}%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=https%3A//www.googleapis.com/auth/userinfo.profile&prompt=consent`,
                                 text: `Log in with Google`,
                              },
                              {
                                 link: `/testimonial`,
                                 text: `Testimonials`,
                              },
                              {
                                 link: `#credits`,
                                 text: `Credits`,
                              },
                           ]}
                        />
                     </div>
                  </div>
               </>
            )}
         </div>
         {data && (
            <>
               <div id="d1" style={{ marginTop: '4rem' }}></div>
               <div
                  className="d-flex justify-content-center"
                  style={{
                     marginTop: '4rem',
                     fontSize: '1.8rem',
                  }}
               >
                  <p className="text-center" style={{ width: '65%' }}>
                     Welcome to Quickstart!. It is an app developed to deliver
                     from all of your favourite restaurants. Our app has an
                     average overall rating {data.avgExperience.toFixed(2)}/10.{' '}
                     <br /> If you don&apos;t have an account, not to worry one
                     will be created upon logging in with{' '}
                     <i className="bi bi-google"></i>oogle.
                     <br />
                     <h4 className="text-danger">
                        Note: Please use your BITS email
                     </h4>
                  </p>
               </div>
               <div id="d1"></div>
               <div id="credits" className="mt-5">
                  <Credits />
               </div>
            </>
         )}
      </>
   );
}

export default App;
