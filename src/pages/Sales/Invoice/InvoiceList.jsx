import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./InvoiceList.css";

const staticInvoices = [
  {
    invoiceNo: "INV-00009",
    orderId: "FLYODR-0723&A00025",
    name: "Arun Kumar",
    email: "arunkumar@gmail.com",
    date: "23 Jul 2026",
    amount: 849.99,
    payment: "Paid",
    delivery: "Pending",
    address: "5D, Mannachanallur, Trichy, Tamil Nadu - 621112",
    saleTime: "19 Jul 2026, 01:04 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (M)",
      sku: "STE-M-2-48552",
    },
  },
  {
    invoiceNo: "",
    orderId: "FLYODR-0723&A00024",
    name: "Priya",
    email: "priya@gmail.com",
    date: "23 Jul 2026",
    amount: 599.0,
    payment: "Pending",
    delivery: "Pending",
    address: "5D, Mannachanallur, Trichy, Tamil Nadu - 621112",
    saleTime: "19 Jul 2026, 12:40 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (M)",
      sku: "STE-M-2-48551",
    },
  },
  {
    invoiceNo: "INV-00008",
    orderId: "FLYODR-0722&A00023",
    name: "Karthik",
    email: "karthik@gmail.com",
    date: "22 Jul 2026",
    amount: 1249.5,
    payment: "Paid",
    delivery: "Pending",
    address: "5D, Mannachanallur, Trichy, Tamil Nadu - 621112",
    saleTime: "19 Jul 2026, 11:15 am",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (M)",
      sku: "STE-M-2-48550",
    },
  },
  {
    invoiceNo: "INV-00007",
    orderId: "FLYODR-0722&A00022",
    name: "Divya",
    email: "divya@gmail.com",
    date: "22 Jul 2026",
    amount: 999.0,
    payment: "Paid",
    delivery: "Shipped",
    address: "45, Textile Market Road, Tiruppur, Tamil Nadu - 641601",
    saleTime: "13 Jul 2026, 04:22 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (M)",
      sku: "STE-M-2-48549",
    },
  },
  {
    invoiceNo: "INV-00006",
    orderId: "FLYODR-0721&A00021",
    name: "Sathish",
    email: "sathish@gmail.com",
    date: "21 Jul 2026",
    amount: 1899.0,
    payment: "Paid",
    delivery: "Shipped",
    address: "12, Anna Nagar, Coimbatore, Tamil Nadu - 641006",
    saleTime: "13 Jul 2026, 02:10 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Track Pant Combo - Charcoal (L)",
      sku: "TRK-L-3-77213",
    },
  },
  {
    invoiceNo: "INV-00005",
    orderId: "FLYODR-0721&A00020",
    name: "Keerthana",
    email: "keerthana@gmail.com",
    date: "21 Jul 2026",
    amount: 649.0,
    payment: "Paid",
    delivery: "Shipped",
    address: "12, Anna Nagar, Coimbatore, Tamil Nadu - 641006",
    saleTime: "13 Jul 2026, 11:05 am",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (M)",
      sku: "STE-M-2-48548",
    },
  },
  {
    invoiceNo: "INV-00004",
    orderId: "FLYODR-0720&A00019",
    name: "Ramesh",
    email: "ramesh@gmail.com",
    date: "20 Jul 2026",
    amount: 720.0,
    payment: "Pending",
    delivery: "Pending",
    address: "78, Race Course Road, Coimbatore, Tamil Nadu - 641018",
    saleTime: "10 Jul 2026, 09:45 am",
    paymentGateway: "Cash on Delivery",
    item: {
      description: "Full Length Leggings - Jet Black (L)",
      sku: "JBL-L-1-30021",
    },
  },
  {
    invoiceNo: "INV-00003",
    orderId: "FLYODR-0719&A00018",
    name: "Nisha",
    email: "nisha@gmail.com",
    date: "19 Jul 2026",
    amount: 1540.75,
    payment: "Paid",
    delivery: "Delivered",
    address: "9, Gandhipuram, Coimbatore, Tamil Nadu - 641012",
    saleTime: "09 Jul 2026, 06:30 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Yoga Set Combo - Olive Green (S)",
      sku: "OLV-S-4-19087",
    },
  },
  {
    invoiceNo: "INV-00002",
    orderId: "FLYODR-0718&A00017",
    name: "Hari",
    email: "hari@gmail.com",
    date: "18 Jul 2026",
    amount: 825.0,
    payment: "Paid",
    delivery: "Delivered",
    address: "33, R.S. Puram, Coimbatore, Tamil Nadu - 641002",
    saleTime: "05 Jul 2026, 10:12 am",
    paymentGateway: "razorpay",
    item: { description: "Ankle Leggings - Maroon (M)", sku: "MRN-M-2-48601" },
  },
  {
    invoiceNo: "INV-00001",
    orderId: "FLYODR-0717&A00016",
    name: "Lakshmi",
    email: "lakshmi@gmail.com",
    date: "17 Jul 2026",
    amount: 430.0,
    payment: "Pending",
    delivery: "Cancelled",
    address: "5D, Mannachanallur, Trichy, Tamil Nadu - 621112",
    saleTime: "01 Jul 2026, 03:55 pm",
    paymentGateway: "Cash on Delivery",
    item: { description: "Capri Leggings - Navy (S)", sku: "NVY-S-2-48622" },
  },
  {
    invoiceNo: "INV-00000",
    orderId: "FLYODR-0716&A00015",
    name: "Manoj",
    email: "manoj@gmail.com",
    date: "16 Jul 2026",
    amount: 1190.0,
    payment: "Paid",
    delivery: "Shipped",
    address: "5D, Mannachanallur, Trichy, Tamil Nadu - 621112",
    saleTime: "28 Jun 2026, 01:20 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Track Pant Combo - Grey (XL)",
      sku: "GRY-XL-3-77240",
    },
  },
  {
    invoiceNo: "INV-00098",
    orderId: "FLYODR-0715&A00014",
    name: "Aishwarya",
    email: "aishwarya@gmail.com",
    date: "15 Jul 2026",
    amount: 520.0,
    payment: "Paid",
    delivery: "Pending",
    address: "8, Big Bazaar Street, Madurai, Tamil Nadu - 625001",
    saleTime: "25 Jun 2026, 05:05 pm",
    paymentGateway: "razorpay",
    item: {
      description: "Ankle Leggings - SteelPink (S)",
      sku: "STE-S-2-48630",
    },
  },
  {
    invoiceNo: "INV-00097",
    orderId: "FLYODR-0714&A00013",
    name: "Vijay",
    email: "vijay@gmail.com",
    date: "14 Jul 2026",
    amount: 1650.0,
    payment: "Pending",
    delivery: "Shipped",
    address: "56, East Car Street, Madurai, Tamil Nadu - 625002",
    saleTime: "20 Jun 2026, 11:40 am",
    paymentGateway: "Cash on Delivery",
    item: { description: "Yoga Set Combo - Black (M)", sku: "BLK-M-4-19099" },
  },
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
  const navigate = useNavigate();

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

  const handleViewInvoice = (invoice) => {
    navigate(`/InvoiceDetail/${encodeURIComponent(invoice.orderId)}`, {
      state: invoice,
    });
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
            <select
              className="form-select inv-select"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">All Payment</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Pending">Failed</option>
              <option value="Pending">Refunded</option>
            </select>
          </div>

          <div className="inv-select-box">
            <select
              className="form-select inv-select"
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
            >
              <option value="All">All Delivery</option>
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
                      <span
                        className={`inv-badge ${paymentBadgeClass(item.payment)}`}
                      >
                        {item.payment}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`inv-badge ${deliveryBadgeClass(item.delivery)}`}
                      >
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
