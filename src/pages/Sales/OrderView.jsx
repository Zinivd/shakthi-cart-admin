import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../api/api.js";
import Loader from "../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";

const OrderView = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoad, setFormLoad] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await getOrderById(id);

        if (!result) {
          toast.error("Order not found");
          setLoading(false);
          return;
        }

        setOrder(result);
        setOrderStatus(result.order_status);
      } catch (err) {
        toast.error("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;
  if (!order) return <h4 className="text-center mt-5">Order Not Found</h4>;

  const subtotal = order.items?.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );

  // --- UPDATE STATUS HANDLER ---
  const handleStatusUpdate = async () => {
    setFormLoad(true);
    const payload = {
      order_id: order.order_id,
      status: orderStatus,
    };

    try {
      await updateOrderStatus(payload);
      toast.success("Order status updated successfully");
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setFormLoad(false);
    }
  };

  return (
    <div className="main-div">
      {/* Header Section */}
      <div className="body-head mb-3 d-flex flex-wrap justify-content-between">
        <h4 className="m-0">Order Details</h4>

        <div className="d-flex align-items-center flex-wrap gap-2">
          <select
            className="form-select"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="Placed">Placed</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Picked Up">Picked Up</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            type="submit"
            className="listbtn"
            disabled={formLoad}
            onClick={handleStatusUpdate}
          >
            {formLoad ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>

      {/* Order Info */}
      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Order ID</h6>
          <h5>#{order.order_id}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Order Date</h6>
          <h5>{new Date(order.created_at).toLocaleDateString()}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Order Amount</h6>
          <h5>₹ {order.total_amount}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Payment Method</h6>
          <h5>{order.payment_mode}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Payment Status</h6>
          <h5>{order.payment_status}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Order Status</h6>
          <h5>{orderStatus}</h5>
        </div>
      </div>

      {/* Customer Details */}
      <div className="body-head my-3">
        <h4 className="m-0">Customer Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards">
          <h6>Name</h6>
          <h5>{order.user_name}</h5>
        </div>

        <div className="cards">
          <h6>Email</h6>
          <h5>{order.user_email}</h5>
        </div>

        <div className="cards">
          <h6>Phone</h6>
          <h5>{order.user_phone}</h5>
        </div>

        <div className="cards">
          <h6>Address</h6>
          <h5>
            {order.address_building}, {order.address_line1},{" "}
            {order.address_line2}
            <br />
            {order.city}, {order.district}, {order.state} - {order.pincode}
            <br />
            Landmark: {order.landmark}
          </h5>
        </div>
      </div>

      {/* Products Table */}
      <div className="body-head my-3">
        <h4 className="m-0">Product Details</h4>
      </div>

      <div className="container-fluid px-0">
        <div className="list-table">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.product?.images?.[0] || "/no-image.png"}
                          alt="product"
                          height="75"
                          className="object-fit-cover rounded-2"
                        />
                        <div>
                          <h6 className="mb-1">{item.product?.product_name}</h6>
                          <span>
                            {item.product?.color} <br />
                            {item.product?.size_unit
                              ?.map((s) => `${s.size}`)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{item.quantity}</td>
                    <td>₹ {item.price}</td>
                    <td>₹ {item.total}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td>Subtotal</td>
                  <td>₹ {subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td>Total</td>
                  <td>₹ {order.total_amount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
