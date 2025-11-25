import React from "react";

const Dashboard = () => {
  const dashboardCards = [
    {
      id: 1,
      title: "Total Products",
      value: "100",
    },
    {
      id: 2,
      title: "Total Categories",
      value: "100",
    },
    {
      id: 3,
      title: "Total Orders",
      value: "100",
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "100",
    },
  ];

  const dashboardList = [
    {
      id: 1,
      title: "T-Shirt",
      qty: "10",
      category: "Men",
    },
    {
      id: 2,
      title: "Shorts",
      qty: "30",
      category: "Unisex",
    },
    {
      id: 3,
      title: "Tops",
      qty: "5",
      category: "Women",
    },
    {
      id: 4,
      title: "Dress",
      qty: "50",
      category: "Kids",
    },
  ];
  return (
    <div className="container-fluid px-0">
      <div className="dashboard-wrapper">
        <div className="row-1">
          <div className="dashboard-grid">
            {dashboardCards.map((cards) => (
              <div className="mb-2" key={cards.id}>
                <div className="dashboard-card">
                  <div className="dashboard-card-div">
                    <h5>{cards.title}</h5>
                    <h3>{cards.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-list">
            <div className="dashboard-card">
              <div className="dashboard-card-div h-auto">
                <div className="body-head">
                  <h4 className="mt-1 mb-3">Famous Products</h4>
                </div>
                <div
                  className="table-wrapper"
                  style={{ height: "25vh", overflow: "auto" }}
                >
                  <table className="table">
                    <tbody>
                      {dashboardList.map((list) => (
                        <tr key={list.id}>
                          <td>
                            <h5>{list.title}</h5>
                            <h6>{list.category}</h6>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <button className="listtdbtn">
                                {list.qty} Products
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-2 mt-2">
          <div className="dashboard-list">
            <div className="list-table">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>10-10-2025</td>
                      <td>₹ 100</td>
                      <td>Pending</td>
                      <td>
                        <button className="listtdbtn">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="dashboard-list">
            <div className="dashboard-card">
              <div className="dashboard-card-div h-auto">
                <div className="body-head">
                  <h4 className="mt-1 mb-3">Famous Products</h4>
                </div>
                <div
                  className="table-wrapper"
                  style={{ height: "25vh", overflow: "auto" }}
                >
                  <table className="table">
                    <tbody>
                      {dashboardList.map((list) => (
                        <tr key={list.id}>
                          <td>
                            <h5>{list.title}</h5>
                            <h6>{list.category}</h6>
                          </td>
                          <td>
                            <div className="d-flex justify-content-end">
                              <button className="listtdbtn">
                                {list.qty} Products
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
