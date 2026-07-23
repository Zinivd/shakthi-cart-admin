import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./InvoiceDetail.css";
import Assets from "./Assets";

const companyInfo = {
  name: "SakthiCart",
  addressLine1: "82,surya hospital, ganapathy",
  addressLine2: "ganapathy, Tiruppur",
  addressLine3: "Coimbatore, Tamil Nadu 641603",
  email: "info@sakthicart.com",
  phone: "+91 7358828634",
  gstin: "3HDHD748493JDJD",
  website: "https://sakthicart.com",
};

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
    address: "123, Harur, Dharmapuri, Tamil Nadu - 636016",
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
    address: "123, Harur, Dharmapuri, Tamil Nadu - 636016",
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
    address: "123, Harur, Dharmapuri, Tamil Nadu - 636016",
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
    address: "5, Nehru Street, Salem, Tamil Nadu - 636001",
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
    address: "21, Bazaar Street, Erode, Tamil Nadu - 638001",
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

const deriveBreakdown = (amount) => {
  const subtotal = Math.round((amount / 1.1602) * 100) / 100;
  const discount = Math.round(subtotal * 0.1 * 100) / 100;
  const shipping = 49.0;
  const netAfterDiscount = Math.round((subtotal - discount) * 100) / 100;
  const tax = Math.round((amount - netAfterDiscount - shipping) * 100) / 100;
  return { subtotal, discount, shipping, tax, netAfterDiscount };
};

// ---------------------------------------------------------------------------

const paymentBadgeClass = (status) =>
  status === "Paid" ? "badge-paid" : "badge-pending";

const InvoiceDetail = () => {
  const { orderId } = useParams();
  const printRef = useRef(null);

  const invoice = staticInvoices.find(
    (inv) => inv.orderId === decodeURIComponent(orderId || ""),
  );

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice
      ? `${invoice.invoiceNo || invoice.orderId}`
      : "invoice",
  });

  if (!invoice) {
    return (
      <div className="invd-page">
        <div className="invd-card invd-notfound">
          <p>
            Invoice not found for order <b>{orderId}</b>.
          </p>
        </div>
      </div>
    );
  }

  const { subtotal, discount, shipping, tax, netAfterDiscount } =
    deriveBreakdown(invoice.amount);

  return (
    <div className="invd-page">
      <div className="invd-toolbar">
        <button className="invd-print-btn" onClick={handlePrint}>
          <i className="fas fa-print"></i> Print / Save as PDF
        </button>
      </div>

      <div className="invd-card" ref={printRef}>
        <div className="invd-header">
          <div>
            <h2>Tax Invoice</h2>
            <p>
              <b>Invoice No:</b> {invoice.invoiceNo || "-"}
            </p>
            <p>
              <b>Invoice Date:</b> -
            </p>
          </div>
          <img src={Assets.Logo} alt="Company logo" className="invd-logo" />
        </div>

        <div className="invd-section">
          <h4>BILL FROM</h4>
          <p className="invd-strong">{companyInfo.name}</p>
          <p>{companyInfo.addressLine1}</p>
          <p>{companyInfo.addressLine2}</p>
          <p>{companyInfo.addressLine3}</p>
          <p>Email: {companyInfo.email}</p>
          <p>Phone: {companyInfo.phone}</p>
          <p>GSTIN: {companyInfo.gstin}</p>
        </div>

        <div className="invd-two-col invd-section">
          <div>
            <h4>SHIPPING ADDRESS</h4>
            <p className="invd-strong">{invoice.name}</p>
            <p>{invoice.address}</p>
            <p>Email: {invoice.email}</p>
          </div>
          <div>
            <h4>BILLING ADDRESS</h4>
            <p className="invd-strong">{invoice.name}</p>
            <p>{invoice.address}</p>
            <p>Email: {invoice.email}</p>
          </div>
        </div>

        <div className="invd-section">
          <h4>ORDER DETAILS</h4>
          <p>
            <b>Order Number:</b> {invoice.orderId}
          </p>
          <p>
            <b>Sale Date:</b> {invoice.saleTime}
          </p>
        </div>

        <div className="invd-table-wrap">
          <table className="invd-table">
            <thead>
              <tr>
                <th>ITEM DESCRIPTION</th>
                <th>SKU CODE</th>
                <th>QTY</th>
                <th>RATE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoice.item.description}</td>
                <td>{invoice.item.sku}</td>
                <td>1</td>
                <td>INR {netAfterDiscount.toFixed(2)}</td>
                <td>INR {netAfterDiscount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invd-two-col invd-summary-row">
          <div>
            <h4>PAYMENT TYPE</h4>
            <p>{invoice.paymentGateway}</p>
            <span
              className={`invd-badge ${paymentBadgeClass(invoice.payment)}`}
            >
              {invoice.payment.toUpperCase()}
            </span>
          </div>

          <table className="invd-summary-table">
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>INR {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>- INR {discount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>INR {shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>INR {tax.toFixed(2)}</td>
              </tr>
              <tr className="invd-total-row">
                <td>Total</td>
                <td>INR {invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invd-footer">
          <p>Thank you for shopping with {companyInfo.name}.</p>
          <p>{companyInfo.website}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
