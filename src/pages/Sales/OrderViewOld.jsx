import React from "react";

const OrderViewOld = () => {
  const data = [
    {
      id: 1,
      img: "https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1759917565",
      name: "T-Shirt",
      size: "M",
      color: "Black",
      price: "1000",
      qty: "5",
      deliveryType: "Outsider TamilNadu",
      time: "3 - 7",
    },
  ];
  return (
    <div className="main-div">
      {/* Order Details */}
      <div className="body-head mb-3">
        <h4 className="m-0">Order Details</h4>
      </div>
      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Order ID</h6>
          <h5 className="mb-0">#ORD001</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Order Date</h6>
          <h5 className="mb-0">10-10-2025</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Order Amount</h6>
          <h5 className="mb-0">₹ 1000</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Payment Method</h6>
          <h5 className="mb-0">UPI</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Order Status</h6>
          <h5 className="mb-0">Pending</h5>
        </div>
      </div>
      {/* Customer Details */}
      <div className="body-head my-3">
        <h4 className="m-0">Customer Details</h4>
      </div>
      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Name</h6>
          <h5 className="mb-0">Naveen Kumar</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Email ID</h6>
          <h5 className="mb-0">naveen@gmail.com</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Contact Number</h6>
          <h5 className="mb-0">+91 9874563210</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Address</h6>
          <h5 className="mb-0">
            166/44E, Thiruvalluvar Street, Near Perumaul Kovil,
            Chinnathirupathi, Salem - 636008
          </h5>
        </div>
      </div>
      {/* Order Products */}
      <div className="body-head my-3">
        <h4 className="m-0">Products Details</h4>
      </div>
      <div className="container-fluid px-0">
        <div className="list-table">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Products</th>
                  <th>Delivery Type</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <div className="d-flex align-items-center column-gap-2">
                        <img
                          src={item.img}
                          alt="img"
                          className="object-fit-cover rounded-2"
                          height="75px"
                        />
                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <span>
                            {item.color} - {item.size}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{item.deliveryType}</span>
                      <br />
                      <span>{item.time} days</span>
                    </td>
                    <td>{item.qty}</td>
                    <td>₹ {item.price}</td>
                    <td>₹ {item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"></td>
                  <td>SubTotal</td>
                  <td>₹ {data.reduce((acc, item) => acc + item.price, 0)}</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td>Tax (18%)</td>
                  <td>₹ 180</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td>Shipping</td>
                  <td>₹ {data.reduce((acc, item) => acc + item.price, 0)}</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td>Total</td>
                  <td>₹ {data.reduce((acc, item) => acc + item.price, 0)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewOld;
