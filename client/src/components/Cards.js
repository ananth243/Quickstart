const Card = ({ order, info }) => {
  return (
    <div
      key={order._id}
      className="card"
      style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
    >
      <div className={`card-header ${info?"text-white bg-info":" "}`}>{order.rest_name}</div>
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
        <h6 className="card-title">Ordered At: {order.createdAt.slice(11, 19)},{order.createdAt.slice(2, 10)}</h6>
        <h6 className="card-title">Delivered at: {order.updatedAt.slice(11, 19)}, {order.updatedAt.slice(2, 10)}</h6>
        <h6 className="card-title">Total Cost: &#8377;{order.total}</h6>
      </div>
    </div>
  );
};

export default Card;