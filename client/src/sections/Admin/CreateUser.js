import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import copy from "copy-to-clipboard";
import Popover from "../../../node_modules/bootstrap/js/src/popover";

const Create = () => {
  const history = useHistory();
  const [username, setName] = useState("Enter");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const buttonRef = useRef();

  function generate() {
    let pwd = "";
    const chars = "awgdopeqh@#f$yz890r^i6j&kl7mn12c5xt*uvs3b4";
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
    copy(pwd);
    const pop = new Popover(buttonRef.current)
    pop.toggle();
    setTimeout(()=>{
      pop.dispose()
    }, 5000)
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER}/admin/create`, {
        username,
        password,
        headers: {
          jwt: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        history.push("/admin/orders");
      })
      .catch((err) => {
        setNameError(err.response.data.name);
        setPasswordError(err.response.data.password);
      });
  }
  return (
    <div className="container-fluid">
      <div className="">
        <form id="login" className="mb-3 needs-validation" noValidate>
          <h1 className="h1">CREATE NEW USER</h1>
          <div className="ms-5">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group has-validation w-75">
              <input
                type="text"
                className={`form-control is-${
                  nameError === null || nameError === "" ? "" : "in"
                }valid`}
                id="username"
                value={username}
                placeholder="Enter here"
                onChange={(e) => setName(e.target.value)}
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
                  passwordError === null || passwordError === "" ? "" : "in"
                }valid`}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">{passwordError}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
              ref={buttonRef}
                type="button"
                className="btn btn-info text-white mt-2"
                style={{ width: "10.4rem" }}
                onClick={generate}
                title="Password saved to clipboard"
                data-bs-placement="right"
              >
                Generate Password
              </button>
              <button
                type="button"
                className="btn btn-primary mb-2 mt-5"
                style={{ width: "5rem" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
