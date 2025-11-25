import React from "react";

const CategoryView = () => {
  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Category Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Category Code</h6>
          <h5 className="mb-0">CAT01</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Category</h6>
          <h5 className="mb-0">Women</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Sub Category</h6>
          <h5 className="mb-0">Tops, Kurtis, Skirts</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Description</h6>
          <h5 className="mb-0">Nil</h5>
        </div>
        <div className="cards mb-2">
          <h6 className="mb-1">Status</h6>
          <h5 className="mb-0">
            <span className="text-success">Active</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
