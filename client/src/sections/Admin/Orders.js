import React, { useState } from "react";
import Incoming from "./Incoming";
import Finished from "./Finished";
import Credits from "./Credits";
import { useHistory } from "react-router-dom";
import logo from "../../img/Quickstart.png";

const Orders = () => {
  const [button1, setButton1] = useState(true);
  const [button2, setButton2] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();

  function Logout() {
    localStorage.removeItem("jwt");
    history.push("/admin");
  }
  function Push() {
    setButton1(false);
    setDropdown(false);
    setButton2(true);
  }
  return (
    <>
      <div className="fixed-top  bg-admin">
        <nav id="large" className="navbar text-white bg-gradient">
          <ul className="w-100" style={{ listStyle: "none" }}>
            <li className="nav-item">
              <img
                src={logo}
                className="rounded-circle me-2"
                style={{
                  height: "4rem",
                  width: "4rem",
                  marginLeft: "1.5rem",
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
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
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
                    <li className="hover dropdown-item" onClick={Logout}>
                      Logout
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
              border: "none",
              textAlign: "center",
              minHeight: "2.5rem",
              borderRadius: "1.5rem 1.5rem 0 0",
            }}
            className={`w-25 bg-${button1 ? "body" : "nav"} text-${
              button1 ? "dark" : "white"
            }`}
            onClick={() => {
              setButton1(true);
              setDropdown(false);
              setButton2(false);
            }}
          >
            Incoming Orders
          </button>
          <button
            style={{
              border: "none",
              textAlign: "center",
              borderRadius: "1.5rem 1.5rem 0 0",
            }}
            onClick={Push}
            className={`h-auto ms-5 w-25 text-${
              button2 ? "dark" : "white"
            } bg-${button2 ? "body" : "nav"}`}
          >
            {" "}
            Finished orders
          </button>
        </div>
      </div>
      <div style={{ marginTop: "12rem" }}>
        {button1 && <Incoming Push={Push} />}
        {button2 && <Finished />}
      </div>
    </>
  );
};

export default Orders;