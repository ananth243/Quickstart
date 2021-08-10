import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Callback = () => {
  const history = useHistory();
  let query = useQuery();
  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/google/", {
        headers: {
          token: query.get("code"),
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        history.push("/app");
      })
      .catch((err) => {
        history.push("/");
      });
  });
  return (
    <div>
      <h1>Processing</h1>
    </div>
  );
};

export default Callback;
