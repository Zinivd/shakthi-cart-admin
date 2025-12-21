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
  const [categoryImage, setCategoryImage] = useState(null);
  const [oldCategoryImage, setOldCategoryImage] = useState("");
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
        setOldCategoryImage(data.image || "");
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
    setOldCategoryImage("");
  };

  const handleUpdate = async () => {
    if (!categoryName) {
      toast.error("Category name is required");
      return;
    }

    setFormLoad(true);

    try {
      const formData = new FormData();
      formData.append("category_id", id);
      formData.append("category_name", categoryName);

      // Only send image if user selected new one
      if (categoryImage) {
        formData.append("image", categoryImage);
      }

      // UPDATE CATEGORY (name + image)
      await updateCategory(formData);

      // Separate new & existing subcategories
      const newSubcategories = subcategories.filter(
        (sub) => !sub.sub_category_id
      );

      const existingSubcategories = subcategories.filter(
        (sub) => sub.sub_category_id
      );

      // ADD new subcategories
      if (newSubcategories.length > 0) {
        await addSubcategory({
          category_id: id,
          subcategories: newSubcategories.map((sub) => ({
            sub_category_name: sub.sub_category_name,
          })),
        });
      }

      // UPDATE existing subcategories
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
          <div className="col-md-3 col-lg-3 mb-3">
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
            {(categoryImage || oldCategoryImage) && (
              <div className="position-relative mt-2">
                <img
                  src={
                    categoryImage
                      ? URL.createObjectURL(categoryImage)
                      : oldCategoryImage
                  }
                  alt="category"
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
        <h4>Edit Sub Category</h4>
      </div>
      {/* SUBCATEGORY INPUT */}
      <div className="form-div">
        <div className="row mb-2">
          <div className="col-md-3 col-lg-3 mb-2">
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

          <div className="col-md-2 col-lg-2 mb-2 d-flex align-items-end">
            <button type="button" className="greenbtn mt-2" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {/* EXISTING SUBCATEGORY LIST */}
        {subcategories.map((sub, index) => (
          <div key={index} className="row">
            <div className="col-md-3 col-lg-3 mb-2">
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
