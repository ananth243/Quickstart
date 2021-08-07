import { useHistory } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";

const Incoming = ({ Push }) => {
  const history = useHistory();
  const [data, error] = useFetch(
    `${process.env.REACT_APP_SERVER}/admin/orders`
  );
  if (error) {
    history.push("/admin");
  }
  function submitForm(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER}/admin/update`, {
        headers: {
          jwt: localStorage.getItem("jwt"),
        },
        body: data.data.orders,
      })
      .then((res) => {
        Push();
      })
      .catch((err) => history.push("/admin"));
  }
  return (
    <div>
      {data && (
        <>
          <div className="container-fluid">
            {data.data.orders.map((order) => (
              <div
                key={order._id}
                className="card"
                style={{ marginTop: "5rem" }}
              >
                <div className="card-header">{order.rest_name}</div>
                <div className="card-body">
                  <h5 className="card-title">Name: {order.user_id}</h5>
                  <h6 className="card-title">Address: {order.address}</h6>
                  <table className="card-text table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Cost (In &#8377;)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h6 className="card-title">Ordered At: {order.createdAt}</h6>
                  <h6 className="card-title">
                    Total Cost: &#8377;{order.total}
                  </h6>
                </div>
                <div className="card-footer">
                  <div className="form-check">
                    <input
                      onClick={(e) => {
                        order.delivered = order.delivered === 0 ? 1 : 0;
                      }}
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Delivered
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {data.data.orders.length !== 0 && (
            <button onClick={submitForm} className="btn btn-primary ms-2 mt-5">
              Done
            </button>
          )}
          {data.data.orders.length === 0 && (
            <h3 className="display-6">All Orders have been delivered</h3>
          )}
        </>
      )}
    </div>
  );
};

export default Incoming;
