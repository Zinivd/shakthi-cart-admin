import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/api.js";
import Loader from "../../../components/Loader/Loader.jsx";
import { IconDashboard } from "../../../../public/assets/Assets";

const ProductView = () => {
  const { id } = useParams(); // get product id from URL
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const productData = Array.isArray(res.data?.data)
          ? res.data.data[0]
          : res.data?.data;

        if (!productData) {
          alert("Product not found");
          setLoading(false);
          return;
        }

        const transformedData = {
          ...productData,
          images: productData.images?.length
            ? productData.images
            : [IconDashboard],
          sizes: productData.size_unit || [],
        };

        setProduct(transformedData);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>No product data available</p>;

  return (
    <div className="main-div">
      <div className="body-head mb-3">
        <h4 className="m-0">Product Details</h4>
      </div>

      <div className="profile-card">
        <div className="cards mb-2">
          <h6 className="mb-1">Product Code</h6>
          <h5 className="mb-0">{product.product_id}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Product Name</h6>
          <h5 className="mb-0">{product.product_name}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Brand Name</h6>
          <h5 className="mb-0">{product.brand}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Category</h6>
          <h5 className="mb-0">{product.category_name}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">SubCategory</h6>
          <h5 className="mb-0">{product.sub_category_name}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Color</h6>
          <h5 className="mb-0">{product.color}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Actual Price</h6>
          <h5 className="mb-0">₹ {product.actual_price}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Selling Price</h6>
          <h5 className="mb-0">₹ {product.selling_price}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Discount</h6>
          <h5 className="mb-0">{product.discount}%</h5>
        </div>

        {/* <div className="cards mb-2">
          <h6 className="mb-1">Flash Deal</h6>
          <h5 className="mb-0">{product.flash_deal}</h5>
        </div> */}

        <div className="cards mb-2">
          <h6 className="mb-1">Description</h6>
          <h5 className="mb-0">{product.description}</h5>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Product Images</h6>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
            {product.images.map((img, i) => (
              <img
                key={i}
                className="rounded-1 object-fit-cover"
                src={img}
                title={`Image ${i + 1}`}
                style={{ height: "100px", width: "100px" }}
              />
            ))}
          </div>
        </div>

        <div className="cards mb-2">
          <h6 className="mb-1">Sizes / Quantity</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="py-1">Size</th>
                <th className="py-1">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((s, index) => (
                <tr key={index}>
                  <td className="py-1">{s.size}</td>
                  <td className="py-1">{s.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
