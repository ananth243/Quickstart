import React from 'react';
import { arrayOf, string } from 'prop-types';

const Canvas = ({ header, links }) => {
   return (
      <>
         <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel" className="text-dark">
               {header}
            </h5>
            <button
               type="button"
               className="btn-close text-reset"
               data-bs-dismiss="offcanvas"
               aria-label="Close"
            ></button>
         </div>
         <div className="offcanvas-body">
            <nav>
               <ul className="list-unstyled">
                  {links.map((link, index) => (
                     <li key={index}>
                        <a className="nav-link" href={link.link} role="button">
                           {link.text}
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>
      </>
   );
};

Canvas.propTypes = {
   header: string,
   links: arrayOf({
      link: string,
      text: string,
   }),
};

export default Canvas;
