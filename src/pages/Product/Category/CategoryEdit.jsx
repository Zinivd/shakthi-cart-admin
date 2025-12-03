import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
  const [description, setDescription] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [formLoad, setFormLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryById(id);
        setCategoryName(data.category_name);
        setDescription(data.description);
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
      await updateCategory({
        category_id: id,
        category_name: categoryName,
        description,
      });

      for (const sub of subcategories) {
        await updateSubCategory({
          id: sub.id,
          sub_category_id: sub.sub_category_id,
          sub_category_name: sub.sub_category_name,
          category_id: id,
        });
      }

      toast.success("Category Updated Successfully!");
      navigate('/product/category/list');
    } catch (err) {
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
            <label>Category</label>
            <input
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="col-lg-3 mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SUBCATEGORY INPUT */}
      <div className="form-div">
        <div className="row mb-2">
          <div className="col-lg-3 mb-2">
            <label>Subcategories</label>
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
