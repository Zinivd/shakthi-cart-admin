import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCategory, addSubcategory } from "../../../api/api.js";

const CategoryAdd = () => {
  const [category, setCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ADD SUBCATEGORY
  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    setSubcategories([...subcategories, inputValue.trim()]);
    setInputValue("");
  };

  // REMOVE SUBCATEGORY
  const handleRemove = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  // Add IMAGE

  const handleCategoryImageAdd = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (files.length > 1) {
      toast.error("Only one image is allowed");
      e.target.value = "";
      return;
    }
    setCategoryImage(files[0]);
  };

  const handleCategoryImageRemove = () => {
    setCategoryImage(null);
  };

  // SAVE CATEGORY + SUBCATEGORIES
  const handleSubmit = async () => {
    if (!category || !categoryImage) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("category_name", category);
      formData.append("image", categoryImage);

      const catRes = await addCategory(formData);
      const categoryId = catRes?.data?.data?.category_id;

      if (!categoryId) {
        toast.error("Backend did not return category_id!");
        return;
      }

      toast.success("Category Created Successfully!");

      // SUBCATEGORIES
      if (subcategories.length > 0) {
        const subPayload = {
          category_id: categoryId,
          subcategories: subcategories.map((name) => ({
            sub_category_name: name,
          })),
        };

        await addSubcategory(subPayload);
        toast.success("Subcategories Created Successfully!");
      }

      // RESET
      setCategory("");
      setCategoryImage(null);
      setSubcategories([]);
      navigate("/product/category/list");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something Went Wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Add Category</h4>
      </div>
      {/* CATEGORY INPUTS */}
      <div className="form-div mb-3">
        <div className="row">
          <div className="col-md-3 col-lg-3 mb-3">
            <label>
              Category <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="col-md-3 col-lg-3 mb-3">
            <label>
              Category Image <span>*</span>
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleCategoryImageAdd}
            />
          </div>
          <div className="col-md-2 col-lg-2 mb-3">
            {categoryImage && (
              <div className="position-relative mt-2">
                <img
                  src={URL.createObjectURL(categoryImage)}
                  alt="preview"
                  className="rounded-2 object-fit-cover"
                  style={{
                    height: "125px",
                    width: "125px",
                    objectPosition: "top",
                  }}
                />
                <button
                  type="button"
                  className="xmarkbtn"
                  style={{ position: "absolute", top: 2, right: 2 }}
                  onClick={handleCategoryImageRemove}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="body-head mb-3">
        <h4>Add Sub Category</h4>
      </div>
      {/* SUBCATEGORY INPUT */}
      <div className="form-div">
        <div className="row mb-2">
          <div className="col-md-3 col-lg-3 mb-2">
            <label>
              Sub Category <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="col-md-2 col-lg-2 mb-2 d-flex align-items-end">
            <button type="button" className="greenbtn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {/* SHOW SUBCATEGORY LIST */}
        {subcategories.map((item, index) => (
          <div key={index} className="row">
            <div className="col-md-3 col-lg-3 mb-2">
              <input
                type="text"
                className="form-control"
                value={item}
                readOnly
              />
            </div>

            <div className="col-md-2 col-lg-2 mb-2 d-flex align-items-end">
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
      {/* SUBMIT BUTTON */}
      <div className="d-flex justify-content-start my-3">
        <button
          type="submit"
          className="formbtn"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Save Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryAdd;
