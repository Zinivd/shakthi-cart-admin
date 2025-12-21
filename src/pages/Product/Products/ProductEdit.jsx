import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, editProduct } from "../../../api/api.js";
import api from "../../../api/api.js";
import ENDPOINTS from "../../../api/endpoints.js";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader.jsx";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formLoad, setFormLoad] = useState(false);
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [listType, setListType] = useState("");
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [deletedOldImages, setDeletedOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [rows, setRows] = useState([]);
  const [sizeValue, setSizeValue] = useState("");
  const [qty, setQty] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  const colorOptions = [
    "Jet Black",
    "Snow White",
    "Royal Blue",
    "Crimson Red",
    "Mint Green",
    "Sunflower Yellow",
    "Charcoal Grey",
    "Peach",
    "Maroon",
    "Lavender",
  ];

  const productListType = ["Trending Now", "Top Rated", "Best Seller"];

  // Fetch product, categories, subcategories
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getProductById(id);
        const product = Array.isArray(res.data?.data)
          ? res.data.data[0]
          : res.data?.data;
        if (!product) {
          toast.error("Product not found");
          setLoading(false);
          return;
        }

        setProductName(product.product_name || "");
        setBrand(product.brand || "");
        setCategory(product.category_id || "");
        setSubCategory(product.sub_category_id || "");
        setColor(product.color || "");
        setActualPrice(product.actual_price || "");
        setSellingPrice(product.selling_price || "");
        setDiscount(product.discount || "");
        setDescription(product.description || "");
        setListType(product.product_list_type || "");
        setOldImages(product.images || []);
        setRows(
          (product.size_unit || []).map((s) => ({
            size: s.size,
            qty: s.qty,
          }))
        );

        const [catRes, subRes] = await Promise.all([
          api.get(ENDPOINTS.CATEGORIES),
          api.get(ENDPOINTS.SUBCATEGORIES),
        ]);
        setCategories(catRes.data?.data || []);
        setSubCategories(subRes.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // Image handlers
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const totalImages = oldImages.length + newImages.length + files.length;
    if (totalImages > 4) {
      toast.error("You can upload only 4 images in total");
      e.target.value = "";
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeOldImage = (index) => {
    setDeletedOldImages((prev) => [...prev, oldImages[index]]);
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Size / Quantity handlers
  const handleAddRow = () => {
    if (!sizeValue || qty === "") {
      toast.error("Select size and enter quantity");
      return;
    }
    setRows((prev) => [...prev, { size: sizeValue, qty: Number(qty) }]);
    setSizeValue("");
    setQty("");
  };

  const handleRemoveRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Update product
  const handleUpdate = async () => {
    setFormLoad(true);
    const formData = new FormData();

    formData.append("product_id", id);
    formData.append("product_name", productName);
    formData.append("brand", brand);
    formData.append("category_id", category);
    formData.append("sub_category_id", subCategory);
    formData.append("color", color);
    formData.append("actual_price", actualPrice);
    formData.append("selling_price", sellingPrice);
    formData.append("discount", discount);
    formData.append("product_list_type", listType);
    formData.append("description", description);

    // Sizes
    formData.append("size_unit", JSON.stringify(rows));

    // Only include old images that are not deleted
    formData.append("old_images", JSON.stringify(oldImages));

    // New images
    newImages.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      await editProduct(formData);
      toast.success("Product updated successfully");
      navigate("/product/list");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setFormLoad(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Edit Product</h4>
      </div>

      <div className="form-div mb-3">
        <div className="row">
          {/* Product Info */}
          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Product Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Brand Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Category <span>*</span>
            </label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Sub Category <span>*</span>
            </label>
            <select
              className="form-select"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((subcat) => (
                <option
                  key={subcat.sub_category_id}
                  value={subcat.sub_category_id}
                >
                  {subcat.sub_category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Color <span>*</span>
            </label>
            <select
              className="form-select"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            >
              <option value="">Select Color</option>
              {colorOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Actual Price <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Selling Price <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Discount (%) <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 col-xl-6 mb-3">
            <label>
              Description <span>*</span>
            </label>
            <textarea
              rows="3"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Product List Type <span>*</span>
            </label>
            <select
              className="form-select"
              value={listType}
              onChange={(e) => setListType(e.target.value)}
              required
            >
              <option value="">Select Product List Type</option>
              {productListType.map((plt) => (
                <option key={plt} value={plt}>
                  {plt}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Product Images <span>*</span>
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* Old images */}
          <div className="col-md-6 col-xl-6 d-flex gap-2 flex-wrap mb-3">
            {oldImages.map((img, i) => (
              <div key={i} className="position-relative">
                <img
                  src={img}
                  alt={`old-${i}`}
                  style={{
                    height: "75px",
                    width: "75px",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <button
                  type="button"
                  className="xmarkbtn"
                  style={{ position: "absolute", right: 2, top: 2 }}
                  onClick={() => removeOldImage(i)}
                >
                  ✕
                </button>
              </div>
            ))}

            {previews.map((src, i) => (
              <div key={i} className="position-relative">
                <img
                  src={src}
                  alt={`new-${i}`}
                  style={{
                    height: "75px",
                    width: "75px",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <button
                  type="button"
                  className="xmarkbtn"
                  style={{ position: "absolute", right: 2, top: 2 }}
                  onClick={() => removeNewImage(i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size / Quantity */}
      <div className="form-div mb-3">
        <div className="row align-items-end">
          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Size <span>*</span>
            </label>
            <select
              className="form-select"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
            >
              <option value="">Select Size</option>
              {sizeOptions.map((s) => (
                <option
                  key={s}
                  value={s}
                  disabled={rows.some((r) => r.size === s)}
                >
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <label>
              Quantity <span>*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>

          <div className="col-md-3 col-xl-3 mb-3">
            <button type="button" className="greenbtn" onClick={handleAddRow}>
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
                  <select
                    className="form-select"
                    value={item.size}
                    onChange={(e) => {
                      const updatedRows = rows.map((r, i) =>
                        i === index ? { ...r, size: e.target.value } : r
                      );
                      setRows(updatedRows);
                    }}
                  >
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-12 col-md-4 col-xl-3 mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    onChange={(e) => {
                      const updatedRows = rows.map((r, i) =>
                        i === index ? { ...r, qty: Number(e.target.value) } : r
                      );
                      setRows(updatedRows);
                    }}
                  />
                </div>

                <div className="col-sm-12 col-md-4 col-xl-3 mb-3 d-flex align-items-end">
                  <button
                    type="button"
                    className="redbtn"
                    onClick={() => handleRemoveRow(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-3">
        <button className="formbtn" disabled={formLoad} onClick={handleUpdate}>
          {formLoad ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Update Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductEdit;
