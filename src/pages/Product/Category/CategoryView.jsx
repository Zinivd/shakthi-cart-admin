import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../../api/api.js";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader.jsx";

const CategoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryById(id);
        if (!data) {
          toast.error("Category not found!");
          navigate("/product/category/list");
          return;
        }
        setCategory(data);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load category!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (!category) return null;

  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Category Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-2">Category Code</h6>
          <h5 className="mb-0">{category.category_id || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Category Image</h6>
          {category.image ? (
            <img
              src={category.image}
              alt="Category"
              className="rounded-1 object-fit-cover object-top"
              style={{ height: "100px", width: "100px" }}
            />
          ) : (
            <h5 className="mb-0">-</h5>
          )}
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Category</h6>
          <h5 className="mb-0">{category.category_name || "-"}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-2">Sub Category</h6>
          {category.subcategories.map((sub) => (
            <h5 className="mb-1">{sub.sub_category_name}</h5>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
