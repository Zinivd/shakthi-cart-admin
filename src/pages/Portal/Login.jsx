import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo, PortalBG } from "../../../public/assets/Assets";
import "../../../public/assets/css/Portal.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/api.js";

const Login = () => {
  const navigate = useNavigate();

  // React states for form inputs
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Already LoggedIn User
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email, password };
    try {
      const res = await loginApi(payload);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_type", res.data.user.user_type);
        localStorage.setItem("unique_id", res.data.user.unique_id);
        localStorage.setItem("email", res.data.user.email);
        toast.success(res.data.message || "Login successful!");
        // Redirect
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="portal-main">
      <div className="portal-div">
        <div className="portal-left">
          <img src={PortalBG} height="500px" alt="portal-bg" />
        </div>
        <div className="portal-right mt-3">
          <div className="body-head mb-4">
            <div>
              <h4 className="fw-bold mb-2">Welcome Admin</h4>
            </div>
          </div>

          <div className="portal-form">
            <form onSubmit={handleLogin}>
              <div className="row">
                <div className="col-sm-12 mb-4">
                  <label>
                    Email Address <span>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="col-sm-12 mb-4">
                  <label>
                    Password <span>*</span>
                  </label>
                  <div className="inpflex">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control border-0"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i
                      className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={() => setShowPass(!showPass)}
                    ></i>
                  </div>
                </div>

                <div className="col-sm-12 mb-4">
                  <button
                    type="submit"
                    className="loginbtn"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      ""
                    )}
                    {loading ? "" : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
