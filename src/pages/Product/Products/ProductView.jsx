import React from "react";
import { IconDashboard } from "../../../assets/Assets";

const ProductView = () => {
  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Product Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Product Code</h6>
          <h5 className="mb-0">PRDT01</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Product Name</h6>
          <h5 className="mb-0">Full Sleeve Woolen T-Shirt</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Brand Name</h6>
          <h5 className="mb-0">Allen Solly</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Category</h6>
          <h5 className="mb-0">T-Shirt</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Color</h6>
          <h5 className="mb-0">Aqua Blue</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Actual Price</h6>
          <h5 className="mb-0">₹ 1000</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Selling Price</h6>
          <h5 className="mb-0">₹ 990</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Discount</h6>
          <h5 className="mb-0">15%</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Flash Deal</h6>
          <h5 className="mb-0">Trending Now</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Description</h6>
          <h5 className="mb-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At,
            accusantium?
          </h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Size</h6>
          <h5 className="mb-0">S, M, L, XL, XXL</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Quantity</h6>
          <h5 className="mb-0">10</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Description</h6>
          <h5 className="mb-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At,
            accusantium?
          </h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Product Image</h6>
          <h5 className="mb-0">
            <a href={IconDashboard} data-fancybox="product" title="View Images">
              <i className="fas fa-image"></i>
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
