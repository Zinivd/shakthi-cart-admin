import React, { useState } from "react";
import { addReview } from "../../api/api.js";
import { toast } from "react-toastify";
import "../../../public/assets/css/Modal.css";

const Review = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    rating: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!productId) return toast.error("Invalid product");

    const payload = {
      product_id: productId,
      name: formData.name,
      email: formData.email,
      rating: Number(formData.rating),
      title: formData.title || null,
      description: formData.description || null,
    };

    try {
      setLoading(true);
      await addReview(payload);
      toast.success("Review added successfully");

      setFormData({
        name: "",
        email: "",
        title: "",
        rating: "",
        description: "",
      });

      document.querySelector("#reviewPopup .btn-close")?.click();
    } catch (err) {
      console.error(err);
      console.error(err.response?.data);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id="reviewPopup"
      tabIndex="-1"
      aria-labelledby="reviewPopupLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="reviewPopupLabel">
              Add Review
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="review_name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="review_email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="review_title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label htmlFor="review_rating" className="form-label">
                  Rating
                </label>
                <select
                  className="form-select"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-12 col-md-12 mb-3">
                <label htmlFor="review_description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex align-items-center justify-content-center">
            <button
              className="formbtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
