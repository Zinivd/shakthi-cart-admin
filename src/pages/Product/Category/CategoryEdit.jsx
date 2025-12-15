import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addSubcategory,
  getCategoryById,
  updateCategory,
  updateSubCategory,
} from "../../../api/api.js";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader.jsx";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoad, setFormLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryById(id);
        setCategoryName(data.category_name);
        setSubcategories(data.subcategories);
      } catch (err) {
        toast.error("Failed to load category");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      setSubcategories([
        ...subcategories,
        {
          id: null,
          sub_category_id: null,
          sub_category_name: inputValue.trim(),
          category_id: id,
        },
      ]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    setFormLoad(true);

    try {
      // Update Category
      await updateCategory({
        category_id: id,
        category_name: categoryName,
      });

      // Separate new & existing subcategories
      const newSubcategories = subcategories.filter(
        (sub) => !sub.sub_category_id
      );

      const existingSubcategories = subcategories.filter(
        (sub) => sub.sub_category_id
      );

      // POST → New Subcategories
      if (newSubcategories.length > 0) {
        await addSubcategory({
          category_id: id,
          subcategories: newSubcategories.map((sub) => ({
            sub_category_name: sub.sub_category_name,
          })),
        });
      }

      // PUT → Existing Subcategories
      if (existingSubcategories.length > 0) {
        await updateSubCategory({
          category_id: id,
          subcategories: existingSubcategories.map((sub) => ({
            sub_category_id: sub.sub_category_id,
            sub_category_name: sub.sub_category_name,
          })),
        });
      }

      toast.success("Category Updated Successfully!");
      navigate("/product/category/list");
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    } finally {
      setFormLoad(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Edit Category</h4>
      </div>
      {/* CATEGORY INPUTS */}
      <div className="form-div mb-3">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <label>
              Category <span>*</span>
            </label>
            <input
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="body-head mb-3">
        <h4>Edit Sub Category</h4>
      </div>
      {/* SUBCATEGORY INPUT */}
      <div className="form-div">
        <div className="row mb-2">
          <div className="col-lg-3 mb-2">
            <label>
              Subcategories <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="col-lg-2 mb-2 d-flex align-items-end">
            <button type="button" className="greenbtn mt-2" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {/* EXISTING SUBCATEGORY LIST */}
        {subcategories.map((sub, index) => (
          <div key={index} className="row">
            <div className="col-lg-3 mb-2">
              <input
                type="text"
                className="form-control"
                value={sub.sub_category_name}
                onChange={(e) => {
                  const updated = [...subcategories];
                  updated[index].sub_category_name = e.target.value;
                  setSubcategories(updated);
                }}
              />
            </div>

            <div className="col-lg-2 mb-2 d-flex align-items-end">
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

      {/* UPDATE BUTTON */}
      <div className="d-flex justify-content-start my-3">
        <button
          type="submit"
          className="formbtn"
          disabled={formLoad}
          onClick={handleUpdate}
        >
          {formLoad ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Update Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryEdit;
