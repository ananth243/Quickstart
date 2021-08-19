import Profile from '../img/me.jpg';
import React from 'react';

const Credits = () => {
   const links = [
      [
         'https://in.linkedin.com/in/ananth-raghav-2151a9200',
         'linkedin',
         'blue',
      ],
      ['https://github.com/ananth243', 'github', 'black'],
      ['https://www.instagram.com/the_nerd.athlete/', 'instagram', 'red'],
   ];
   return (
      <div className="container-sm credits">
         <div style={{ textAlign: 'justify' }}>
            <p className="fs-5">
               Quickstart is an app built for the core review project of
               Developer&apos;s Society of BITS Goa. It&apos;s entire backend
               infrastructure along with the front end is made by Ananth Raghav,
               a second year student at the same university. The entire
               application revolves around MERN stack with bootstrap used for
               the front end.
            </p>
            <div className="d-flex justify-content-center">
               <img src={Profile} className="rounded-circle img-fluid" />
            </div>
            <div className="d-flex justify-content-around">
               {links.map((link, index) => (
                  <a
                     key={index}
                     href={link[0]}
                     target="_blank"
                     rel="noreferrer"
                     style={{ color: link[2] }}
                  >
                     <i className={`bi bi-${link[1]} fs-1`}></i>
                  </a>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Credits;
