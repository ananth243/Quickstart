import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useAuth } from "../../Hooks/AuthProvider";

const Admin = () => {
   const history = useHistory();
   const [username, setName] = useState('');
   const [password, setPassword] = useState('');
   const [nameError, setNameError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   // const state = useAuth();

   function handleSubmit(e) {
      e.preventDefault();
      axios
         .post(`${process.env.REACT_APP_SERVER}/admin`, {
            username,
            password,
         })
         .then(res => {
            localStorage.setItem('jwt', res.data.jwt);
            // state.current=true;
            history.push('/admin/orders');
         })
         .catch(err => {
            setNameError(err.response.data.name);
            setPasswordError(err.response.data.password);
         });
   }
   return (
      <div className="admin container-fluid">
         <h1 id="admin">Quickstart admin interface</h1>
         <div className="login ">
            <form id="login" className="mb-3 needs-validation" noValidate>
               <h1 className="h1">LOG IN</h1>
               <div className="ms-5">
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
                  <button
                     type="submit"
                     className="btn btn-primary mb-2 mt-4"
                     onClick={handleSubmit}
                  >
                     Submit
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Admin;
