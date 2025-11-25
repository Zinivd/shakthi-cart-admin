import React, { useState } from "react";

const CategoryAdd = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setSubcategories([...subcategories, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    const updated = subcategories.filter((_, i) => i !== index);
    setSubcategories(updated);
  };
  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Add Category</h4>
      </div>
      <div className="form-div mb-3">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="add_category">
              Category <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id="add_category"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="add_category_descp">
              Description <span>*</span>
            </label>
            <textarea
              rows="1"
              className="form-control"
              name=""
              id="add_category_descp"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-div">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="add_subcategory">
              Sub Category <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id="add_subcategory"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3 d-flex align-items-end">
            <button type="button" className="greenbtn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        <div className="mt-3">
          {subcategories.map((item, index) => (
            <div key={index} className="row">
              <div className="col-sm-12 col-md-4 col-xl-3 mb-3">
                <input
                  type="text"
                  className="form-control me-2"
                  value={item}
                  readOnly
                />
              </div>
              <div className="col-sm-12 col-md-4 col-xl-2 mb-3 d-flex align-items-end">
                <button
                  type="button"
                  className="redbtn"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-start my-3">
        <button className="formbtn">Save Category</button>
      </div>
    </div>
  );
};

export default CategoryAdd;
