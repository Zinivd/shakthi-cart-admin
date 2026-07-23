import React, { useState, useMemo } from "react";
import "./InvoiceList.css";

const staticInvoices = [
  { invoiceNo: "INV-00009", orderId: "FLYODR-0719&A00013", name: "Naveen", email: "sheik4748@gmail.com", date: "19 Jul 2026", amount: 578.94, payment: "Paid", delivery: "Pending" },
  { invoiceNo: "", orderId: "FLYODR-0719&A00012", name: "Sheik", email: "sheik4748@gmail.com", date: "19 Jul 2026", amount: 578.94, payment: "Pending", delivery: "Pending" },
  { invoiceNo: "INV-00008", orderId: "FLYODR-0719&A00011", name: "Sheik", email: "sheik4748@gmail.com", date: "19 Jul 2026", amount: 578.94, payment: "Paid", delivery: "Pending" },
  { invoiceNo: "INV-00007", orderId: "FLYODR-0713&A00010", name: "Prakash", email: "spstextup@gmail.com", date: "13 Jul 2026", amount: 578.94, payment: "Paid", delivery: "Shipped" },
  { invoiceNo: "INV-00006", orderId: "FLYODR-0713&A00009", name: "Yasvanth", email: "yasvanth92be@gmail.com", date: "13 Jul 2026", amount: 1108.88, payment: "Paid", delivery: "Shipped" },
  { invoiceNo: "INV-00005", orderId: "FLYODR-0713&A00008", name: "Yasvanth", email: "yasvanth92be@gmail.com", date: "13 Jul 2026", amount: 578.94, payment: "Paid", delivery: "Shipped" },
  { invoiceNo: "INV-00004", orderId: "FLYODR-0710&A00007", name: "Ram Kumar", email: "ramkumar@gmail.com", date: "10 Jul 2026", amount: 899.00, payment: "Pending", delivery: "Pending" },
  { invoiceNo: "INV-00003", orderId: "FLYODR-0709&A00006", name: "Divya", email: "divya@gmail.com", date: "09 Jul 2026", amount: 1250.50, payment: "Paid", delivery: "Delivered" },
  { invoiceNo: "INV-00002", orderId: "FLYODR-0705&A00005", name: "Arjun", email: "arjun@gmail.com", date: "05 Jul 2026", amount: 675.00, payment: "Paid", delivery: "Delivered" },
  { invoiceNo: "INV-00001", orderId: "FLYODR-0701&A00004", name: "Meena", email: "meena@gmail.com", date: "01 Jul 2026", amount: 430.00, payment: "Pending", delivery: "Cancelled" },
  { invoiceNo: "INV-00000", orderId: "FLYODR-0628&A00003", name: "Suresh", email: "suresh@gmail.com", date: "28 Jun 2026", amount: 990.00, payment: "Paid", delivery: "Shipped" },
  { invoiceNo: "INV-00098", orderId: "FLYODR-0625&A00002", name: "Kavya", email: "kavya@gmail.com", date: "25 Jun 2026", amount: 320.00, payment: "Paid", delivery: "Pending" },
  { invoiceNo: "INV-00097", orderId: "FLYODR-0620&A00001", name: "Vignesh", email: "vignesh@gmail.com", date: "20 Jun 2026", amount: 1450.00, payment: "Pending", delivery: "Shipped" },
];

const paymentBadgeClass = (status) => {
  if (status === "Paid") return "badge-paid";
  if (status === "Pending") return "badge-pending";
  return "badge-default";
};

const deliveryBadgeClass = (status) => {
  if (status === "Shipped") return "badge-shipped";
  if (status === "Pending") return "badge-pending";
  if (status === "Delivered") return "badge-paid";
  if (status === "Cancelled") return "badge-cancelled";
  return "badge-default";
};

const InvoiceList = () => {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [deliveryFilter, setDeliveryFilter] = useState("All");

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase();

    return staticInvoices.filter((item) => {
      const matchesSearch =
        term === "" ||
        item.invoiceNo.toLowerCase().includes(term) ||
        item.orderId.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const matchesPayment =
        paymentFilter === "All" || item.payment === paymentFilter;

      const matchesDelivery =
        deliveryFilter === "All" || item.delivery === deliveryFilter;

      return matchesSearch && matchesPayment && matchesDelivery;
    });
  }, [search, paymentFilter, deliveryFilter]);

  const handleViewInvoice = (item) => {
    const url = `/invoice/${encodeURIComponent(item.orderId)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container-fluid px-0 inv-page">
      <div className="inv-header mb-3">
        <h4>Invoices</h4>
        <p className="inv-subtext">{filteredData.length} orders found</p>
      </div>

      <div className="list-table">
        <div className="inv-filter-bar mb-3">
          <div className="inv-search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search by order ID, invoice no, customer name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="inv-select-box">
            <i className="fas fa-credit-card"></i>
            <select
              className="form-select inv-select"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Pending">Failed</option>
              <option value="Pending">Refunded</option>
            </select>
          </div>

          <div className="inv-select-box">
            <i className="fas fa-truck"></i>
            <select
              className="form-select inv-select"
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
            >
              <option value="All">All Delivery Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table inv-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Delivery</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.invoiceNo || "—"}</td>
                    <td>{item.orderId}</td>
                    <td>
                      <div className="inv-customer">
                        <span className="inv-cust-name">{item.name}</span>
                        <span className="inv-cust-email">{item.email}</span>
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>INR {item.amount.toFixed(2)}</td>
                    <td>
                      <span className={`inv-badge ${paymentBadgeClass(item.payment)}`}>
                        {item.payment}
                      </span>
                    </td>
                    <td>
                      <span className={`inv-badge ${deliveryBadgeClass(item.delivery)}`}>
                        {item.delivery}
                      </span>
                    </td>
                    <td>
                      <button
                        className="inv-view-btn"
                        onClick={() => handleViewInvoice(item)}
                      >
                        <i className="fas fa-file-invoice"></i> View Invoice
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;