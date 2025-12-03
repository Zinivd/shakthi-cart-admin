import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProductEdit = () => {
  const [size, setSize] = useState([]);
  const [qty, setQty] = useState("");
  const [previews, setPreviews] = useState([]);
  const [rows, setRows] = useState([]);

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "3XL", label: "3XL" },
    { value: "4XL", label: "4XL" },
  ];

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews].slice(0, 4));
  };
  // Remove image
  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
  };

  // Append
  const handleAdd = () => {
    if (size.length === 0 || qty === "") return;

    const newRow = {
      size,
      qty,
    };
    setRows([...rows, newRow]);
    setSize([]);
    setQty("");
  };
  const handleRemove = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };
  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Edit Product</h4>
      </div>
      <div className="form-div mb-3">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_product">
              Product Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id="edit_product"
              required
              autoFocus
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_brand">
              Brand Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              id="edit_brand"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_cat">
              Category <span>*</span>
            </label>
            <select className="form-select" name="" id="edit_cat" required>
              <option value="" disabled selected>
                Select Category
              </option>
            </select>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_color">
              Color <span>*</span>
            </label>
            <select className="form-select" name="" id="edit_color" required>
              <option value="" disabled selected>
                Select Color
              </option>
            </select>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_act_price">
              Actual Price <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name=""
              min="0"
              id="edit_act_price"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_sell_price">
              Selling Price <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name=""
              min="0"
              id="edit_sell_price"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_discount">
              Discount <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name=""
              min="0"
              id="edit_discount"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_deal">
              Flash Deal <span>*</span>
            </label>
            <select className="form-select" name="" id="edit_deal" required>
              <option value="" disabled selected>
                Select Flash Deal
              </option>
            </select>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_product_descp">
              Description <span>*</span>
            </label>
            <textarea
              rows="1"
              className="form-control"
              name=""
              id="edit_product_descp"
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_product_img">
              Product Images <span>*</span>
            </label>
            <input
              type="file"
              className="form-control"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="col-sm-12 col-md-8 col-xl-6 mb-3 d-flex align-items-end">
            <div className="d-flex align-items-center flex-wrap column-gap-5">
              {previews.map((src, index) => (
                <div key={index} className="w-auto mb-2">
                  <div className="product-img-div">
                    <img
                      src={src}
                      className="rounded-2 object-fit-cover"
                      style={{
                        height: "75px",
                        width: "75px",
                        objectPosition: "top",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="xmarkbtn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size / Qty */}
      <div className="form-div">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_size">
              Size <span>*</span>
            </label>
            <Select
              id="edit_size"
              options={sizeOptions}
              isMulti
              value={size}
              onChange={(selected) => setSize(selected)}
              placeholder="Select Size"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3">
            <label htmlFor="edit_qty">
              Quantity <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name=""
              min="0"
              id="edit_qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 mb-3 d-flex align-items-end">
            <button type="button" className="greenbtn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {rows.length > 0 && (
          <div className="mt-3">
            {rows.map((item, index) => (
              <div key={index} className="row">
                <div className="col-sm-12 col-md-4 col-xl-3 mb-3">
                  <label>Size</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.size.map((s) => s.label).join(", ")}
                    readOnly
                  />
                </div>

                <div className="col-sm-12 col-md-4 col-xl-3 mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    readOnly
                  />
                </div>

                <div className="col-sm-12 col-md-4 col-xl-3 mb-3 d-flex align-items-end">
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
        )}
      </div>

      <div className="d-flex justify-content-start my-3">
        <button className="formbtn">Update Product</button>
      </div>
    </div>
  );
};

export default ProductEdit;
