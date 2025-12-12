import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, getCustomerAddress } from "../../api/api.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.jsx";

const CustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer by unique_id
        const resUser = await getCustomerById(id);
        const userData = resUser.data?.data;
        if (!userData) {
          toast.error("User not found!");
          navigate("/customer/list");
          return;
        }
        setUser(userData);

        // Fetch address by user_id
        const resAddress = await getCustomerAddress(id);
        setAddress(resAddress.data?.data || {});
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load user!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Customer Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-2">Customer Code</h6>
          <h5 className="mb-0">{user.unique_id || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Name</h6>
          <h5 className="mb-0">{user.name || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Contact Number</h6>
          <h5 className="mb-0">+91 {user.phone || "-"}</h5>
        </div>
        
        <div className="cards mb-2">
          <h6 className="mb-2">Email ID</h6>
          <h5 className="mb-0">{user.email || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Address Type</h6>
          <h5 className="mb-0 text-capitalize">
            {address?.address_type || "-"}
          </h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Address Line 1</h6>
          <h5 className="mb-0 text-capitalize">
            {address?.building_name || ""}, {address?.address_1 || ""},{" "}
            {address?.address_2 || ""}
          </h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">City</h6>
          <h5 className="mb-0">{address?.city || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">State</h6>
          <h5 className="mb-0">{address?.state || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Pincode</h6>
          <h5 className="mb-0">{address?.pincode || "-"}</h5>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
