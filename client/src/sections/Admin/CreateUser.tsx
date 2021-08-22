import React, { MouseEvent, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import Popover from 'bootstrap/js/dist/popover';
import Modal from 'bootstrap/js/dist/modal';

const Create = () => {
   const [username, setName] = useState('Enter');
   const [password, setPassword] = useState('');
   const [nameError, setNameError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const history = useHistory();
   const buttonRef: any = useRef<HTMLButtonElement>();

   function generate() {
      let pwd = '';
      const chars = 'awgdopeqh@#f$yz890r^i6j&kl7mn12c5xt*uvs3b4';
      for (let i = 0; i < 8; i++) {
         pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setPassword(pwd);
      copy(pwd);
      const pop = new Popover(buttonRef.current);
      pop.toggle();
      setTimeout(() => {
         pop.dispose();
      }, 2000);
   }

   function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      const myModal = document.querySelector('.modal') as HTMLDivElement;
      const modal = new Modal(myModal);
      axios
         .post(`${process.env.REACT_APP_SERVER}/admin/create`, {
            username,
            password,
            headers: {
               jwt: localStorage.getItem('jwt'),
            },
         })
         .then(() => {
            modal.toggle();
         })
         .catch(err => {
            if (err.response.status === 401) {
               history.push('/admin');
            }
            setNameError(err.response.data.username);
            setPasswordError(err.response.data.password);
         });
   }
   return (
      <div className="container-fluid">
         <div>
            <div className="modal fade">
               <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">
                           Username saved successfully
                        </h5>
                        <button
                           type="button"
                           className="btn-close"
                           data-bs-dismiss="modal"
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="modal-body">
                        <p>
                           Username <strong>{username}</strong> saved
                           successfully
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <form id="login" className="mb-3 needs-validation" noValidate>
               <div className="ms-5">
                  <h1 className="h1 text-center">CREATE NEW USER</h1>
                  <label htmlFor="username" className="form-label">
                     Username
                  </label>
                  <div className="input-group has-validation w-75">
                     <input
                        type="text"
                        className={`form-control is-${
                           nameError === null || nameError === '' ? '' : 'in'
                        }valid`}
                        id="username"
                        value={username}
                        placeholder="Enter here"
                        onChange={e => setName(e.target.value)}
                        required
                     />
                     <div className="invalid-feedback">{nameError}</div>
                  </div>
               </div>
               <div className="mt-2 ms-5">
                  <label htmlFor="password" className="form-label">
                     Password
                  </label>
                  <div className="input-group has-validation w-75">
                     <input
                        type="password"
                        value={password}
                        className={`form-control is-${
                           passwordError === null || passwordError === ''
                              ? ''
                              : 'in'
                        }valid`}
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                     />
                     <div className="invalid-feedback">{passwordError}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <button
                        ref={buttonRef}
                        type="button"
                        className="btn btn-info text-white mt-2"
                        style={{ width: '10.4rem' }}
                        onClick={generate}
                        title="Password saved to clipboard"
                        data-bs-placement="right"
                     >
                        Generate Password
                     </button>
                     <button
                        type="button"
                        className="btn btn-primary mb-2 mt-5"
                        style={{ width: '5rem' }}
                        onClick={handleSubmit}
                     >
                        Submit
                     </button>
                  </div>{' '}
               </div>
            </form>
         </div>
      </div>
   );
};

export default Create;
