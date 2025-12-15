import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories, addProduct, getSubcategories } from "../../../api/api.js";

const ProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [listType, setListType] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState([]);
  const [qty, setQty] = useState("");
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "3XL", label: "3XL" },
    { value: "4XL", label: "4XL" },
  ];

  const colorOptions = [
    { value: "Jet Black", label: "Jet Black" },
    { value: "Snow White", label: "Snow White" },
    { value: "Royal Blue", label: "Royal Blue" },
    { value: "Crimson Red", label: "Crimson Red" },
    { value: "Mint Green", label: "Mint Green" },
    { value: "Sunflower Yellow", label: "Sunflower Yellow" },
    { value: "Charcoal Grey", label: "Charcoal Grey" },
    { value: "Peach", label: "Peach" },
    { value: "Maroon", label: "Maroon" },
    { value: "Lavender", label: "Lavender" },
  ];

  const productListType = [
    { value: "Trending Now", label: "Trending Now" },
    { value: "Top Rated", label: "Top Rated" },
    { value: "Best Seller", label: "Best Seller" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res1 = await getCategories();
        setCategories(res1.data.data);

        const res2 = await getSubcategories();
        setSubcategories(res2.data.data);
      } catch (error) {
        toast.error("Failed to load Dependencies!");
      }
    })();
  }, []);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    const subcat = subcategories.filter((sub) => 
      sub.category_id === id
    );
    setFilteredSubcategories(subcat);
    setSubCategoryId("");
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, 4);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    if (newImages.length > 4) {
      toast.error("You can only upload 4 images");
      return;
    }
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  // Size / Qty
  const handleAddRow = () => {
    if (size.length === 0 || qty === "") {
      toast.info("Select size & enter qty");
      return;
    }
    const newRow = {
      size: size.value,
      qty: qty,
    };
    setRows([...rows, newRow]);
    setSize([]);
    setQty("");
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Save Product
  const handleSubmit = async () => {
    if (
      !productName ||
      !brand ||
      !categoryId ||
      !actualPrice ||
      images.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("brand", brand);
    formData.append("category_id", categoryId);
    formData.append("sub_category_id", subCategoryId);
    formData.append("actual_price", actualPrice);
    formData.append("selling_price", sellingPrice);
    formData.append("discount", discount);
    formData.append("product_list_type", listType);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("size_unit", JSON.stringify(rows));
    images.forEach((file) => {
      formData.append("images[]", file);
    });
    setLoading(true);

    try {
      const res = await addProduct(formData);
      toast.success("Product added successfully!");
      navigate("/product/list");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid px-0">
      <div className="body-head mb-3">
        <h4>Add Product</h4>
      </div>

      <div className="form-div mb-3">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <label>
              Product Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Brand <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Category <span>*</span>
            </label>
            <select
              className="form-select"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 mb-3">
            <label>Sub Category</label>
            <select
              className="form-select"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Select Subcategory
              </option>
              {filteredSubcategories.map((subcat) => (
                <option
                  key={subcat.sub_category_id}
                  value={subcat.sub_category_id}
                >
                  {subcat.sub_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Color <span>*</span>
            </label>
            <select
              className="form-select"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="" disabled>
                Select Color
              </option>
              {colorOptions.map((colors) => (
                <option key={colors.value} value={colors.value}>
                  {colors.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Actual Price <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Selling Price <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Discount (%) <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Product List Type <span>*</span>
            </label>
            <select
              className="form-select"
              value={listType}
              onChange={(e) => setListType(e.target.value)}
            >
              <option value="" disabled>
                Select Product List Type
              </option>
              {productListType.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Description <span>*</span>
            </label>
            <textarea
              className="form-control"
              rows="1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3">
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
          <div className="col-lg-6 d-flex gap-2 flex-wrap">
            {previews.map((src, index) => (
              <div key={index} className="product-img-div">
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
                  className="xmarkbtn"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-div">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <label>
              Size <span>*</span>
            </label>
            <Select options={sizeOptions} value={size} onChange={setSize} />
          </div>
          <div className="col-lg-3 mb-3">
            <label>
              Quantity <span>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="col-lg-3 mb-3 d-flex align-items-end">
            <button type="button" className="greenbtn" onClick={handleAddRow}>
              Add
            </button>
          </div>
        </div>

        {rows.map((item, index) => (
          <div key={index} className="row mb-2">
            <div className="col-lg-3">
              <input
                type="text"
                className="form-control"
                value={item.size}
                readOnly
              />
            </div>

            <div className="col-lg-3">
              <input
                type="number"
                className="form-control"
                value={item.qty}
                readOnly
              />
            </div>

            <div className="col-lg-3 d-flex align-items-end">
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
            "Save Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductAdd;
