import React, { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./InvoiceDetail.css";


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

const deriveBreakdown = (amount) => {
  const subtotal = Math.round((amount / 1.1602) * 100) / 100;
  const discount = Math.round(subtotal * 0.1 * 100) / 100;
  const shipping = 49.0;
  const netAfterDiscount = Math.round((subtotal - discount) * 100) / 100;
  const tax = Math.round((amount - netAfterDiscount - shipping) * 100) / 100;
  return { subtotal, discount, shipping, tax, netAfterDiscount };
};

const paymentBadgeClass = (status) =>
  status === "Paid" ? "badge-paid" : "badge-pending";

const InvoiceDetail = () => {
  const { orderId } = useParams();

  const { state: invoice } = useLocation();
  const printRef = useRef(null);
  const Logo = "/assets/images/Logo.png";

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
            No invoice data for order <b>{orderId}</b>.
          </p>
          <p>
            Please open this page by clicking <b>View Invoice</b> from the
            invoice list.
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
          <img src={Logo} alt="Company logo" className="invd-logo" />
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