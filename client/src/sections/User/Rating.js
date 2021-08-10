import { useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Rating = () => {
  const addressRef = useRef();
  const formRef = useRef();
  const [comment, setComment] = useState("");
  const history = useHistory();

  function submitForm(e) {
    e.preventDefault();
    let rating = [];
    if (comment === "") {
      addressRef.current.focus();
    }
    for (let i = 0; i < formRef.current.children.length; i++) {
      if (formRef.current.children[i].type === "range")
        rating.push(parseInt(formRef.current.children[i].value));
    }
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/rating`, {
        headers: {
          jwt: localStorage.getItem("jwt"),
        },
        body: {
          rating,
          comment,
        },
      })
      .then((res) => {
        history.push("/app");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "6rem" }}>
        <form
          className="container-sm"
          ref={formRef}
          style={{ textTransform: "uppercase" }}
        >
          <h4 className="display-6" style={{ textTransform: "none" }}>
            Thank you for taking time to fill the form. We value your input.
          </h4>
          <label htmlFor="customRange1" className="form-label mt-5">
            On a scale of 1-10 how would you rate the overall experience.
          </label>
          <input
            type="range"
            style={{
              width: "75%",
              backgroundColor: "rgba(5,155,254, 0.1)",
              borderRadius: "3px 3px 3px 3px",
            }}
            className="form-range"
            min="1"
            max="10"
            id="customRange1"
          />
          <label htmlFor="customRange2" className="form-label mt-2">
            On a scale of 1-10 how would you rate the food.
          </label>
          <input
            type="range"
            style={{
              width: "75%",
              backgroundColor: "rgba(5,155,254, 0.1)",
              borderRadius: "3px 3px 3px 3px",
            }}
            className="form-range"
            min="1"
            max="10"
            id="customRange2"
          />

          <label htmlFor="customRange3" className="form-label mt-2">
            On a scale of 1-10 how would you rate the delivery experience.
          </label>
          <input
            type="range"
            style={{
              width: "75%",
              backgroundColor: "rgba(5,155,254, 0.1)",
              borderRadius: "3px 3px 3px 3px",
            }}
            className="form-range"
            min="1"
            max="10"
            id="customRange3"
          />
          <label htmlFor="address" className="form-label mt-4">
            Any additional inputs are also welcome.
          </label>
          <textarea
            id="address"
            ref={addressRef}
            onChange={(e) => setComment(e.target.value)}
            required
            className="form-control"
            aria-label="With textarea"
          />
          <button
            className="btn btn-primary mt-5"
            onClick={submitForm}
            ref={addressRef}
          >
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
};

export default Rating;
