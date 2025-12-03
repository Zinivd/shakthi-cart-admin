import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../api/api.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.jsx";

const CustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserById(id, email);
        if (!data) {
          toast.error("User not found!");
          navigate("/customer/list");
          return;
        }
        setUser(data);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load user!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate, email]);

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Customer Details</h4>
      </div>

      <div className="profile-card">

        <div className="cards mb-2">
          <h6 className="mb-2">Name</h6>
          <h5 className="mb-0">{user.name || "-"}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">Phone</h6>
          <h5 className="mb-0">{user.phone || "-"}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">Address Type</h6>
          <h5 className="mb-0 text-capitalize">{user.address_type || "-"}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">Address Line 1</h6>
          <h5 className="mb-0 text-capitalize">{user.building_name || ""}, {user.address_1 || ""}, {user.address_2 || ""}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">City</h6>
          <h5 className="mb-0">{user.city || "-"}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">State</h6>
          <h5 className="mb-0">{user.state || "-"}</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-2">Pincode</h6>
          <h5 className="mb-0">{user.pincode || "-"}</h5>
        </div>

      </div>
    </div>
  );
};

export default CustomerView;
