import Navbar from "./Navbar";
import useFetch from "../../Hooks/useFetch";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const history = useHistory();
  let [data, error] = useFetch(`${process.env.REACT_APP_SERVER}/app/orders`);
  if (error) {
    history.push("/");
  }
  function orderDelete(e, id) {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER}/app/delete/${id}`, {
        headers: {
          jwt: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        history.go(0);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Navbar />
      {data && data.data.orders.length === 0 && (
        <div className=" background mt-6 ms-6" style={{ fontSize: "1.8rem" }}>
          You haven't placed any orders yet
        </div>
      )}
      {data && data.data.orders.length !== 0 && (
        <div className=" background mt-6 p-5">
          <h3 className="display-6">Your current orders: </h3>

          {data.data.orders.map((element, i) => (
            <div
              key={element._id}
              id={element._id}
              className="container-fluid container-sm mt-5"
            >
              <div className="row">
                <h1 className="col-8">{element.rest_name}</h1>
                <div className="col-2"></div>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#collapse${i}`}
                  className="col-sm-2 btn btn-primary h-25"
                  style={{ marginTop: "3px" }}
                >
                  Delete Order
                </button>
              </div>
              <table className="table table-sm-bordered w-100">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Food</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {element.items.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}.</th>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td style={{ textAlign: "justify" }}>
                        &#8377; {item.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">Delivery Address: {element.address}</td>
                    <td colSpan="2">
                      <table>
                        <tr>
                          <td colSpan="2"> </td>
                          <td style={{ textAlign: "end" }}>Total Amount: </td>
                          <td style={{ textAlign: "end" }}>
                            &#8377; {element.total}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"> </td>
                          <td style={{ textAlign: "end" }}>Ordered At: </td>
                          <td style={{ textAlign: "end" }}>
                            {element.createdAt.slice(2, 10)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"> </td>
                          <td style={{ textAlign: "end" }}>IST: </td>
                          <td style={{ textAlign: "end" }}>
                            {element.createdAt.slice(11, 19)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                className="modal bg-info fade"
                id={`collapse${i}`}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content bg-light">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete order?
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div
                        className="container-fluid"
                        style={{
                          marginTop: "10%",
                        }}
                      >
                        <h1 className="display-4">{element.rest_name}</h1>
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Food</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {element.items.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}.</th>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td style={{ textAlign: "justify" }}>
                                  &#8377; {item.cost}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="2"> </td>
                              <td style={{ textAlign: "end" }}>
                                Total Amount:{" "}
                              </td>
                              <td style={{ textAlign: "justify" }}>
                                &#8377; {element.total}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2"> </td>
                              <td style={{ textAlign: "end" }}>Ordered At: </td>
                              <td style={{ textAlign: "justify" }}>
                                {element.createdAt.slice(2, 10)}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2"> </td>
                              <td style={{ textAlign: "end" }}>IST: </td>
                              <td style={{ textAlign: "justify" }}>
                                {element.createdAt.slice(11, 19)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <form onSubmit={(e) => orderDelete(e, element._id)}>
                        <button
                          type="submit"
                          className="btn btn-danger text-white"
                          style={{ background: "red" }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!data && (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "5rem" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
