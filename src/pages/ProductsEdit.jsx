import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";

export default function ProductsEdit() {

  let { productID } = useParams();

  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [catID, setCatID] = useState(0);

  const getProduct = async () => {
    try {
      const res = await api.get(`/product/${productID}`);
      setProduct(res.data);
      setProductName(res.data?.name);
      setPrice(res.data?.price);
      setCatID(res.data.category.id);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProduct();
  }, [])

  let navigate = useNavigate();

  const updateProduct = async () => {
    try {
      const res = await api.put(`/product/update/${product.id}`, {
        name: productName,
        price: parseFloat(price),
        categoryId: parseFloat(catID)
      });
      console.log(res);
      navigate('/products/manage');
    } catch (e) {
      switch (e?.response?.status) {
        case 400:
          alert('Please, Enter Valid Data');
          break;
        default:
          alert('Some Error Has Happend, Try Again Later');
          break;
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  }

  return (
    <Layout>
      <div className="cats-edit">
        <div className="container">
          <div className="card card-2">
            <div className="card-header">
              <FontAwesomeIcon className="icon" icon={faCartShopping} />
              <h4>Edit Category</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input disabled type="text" value={product.id} className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" placeholder="Product Name" aria-label="username" aria-describedby="basic-addon1" />
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" placeholder="Product Price" aria-label="username" aria-describedby="basic-addon1" />
                <input value={catID} onChange={(e) => setCatID(e.target.value)} type="text" className="form-control" placeholder="Category ID" aria-label="username" aria-describedby="basic-addon1" />
                <button type="submit" className="btn btn-secondary w-25 mt-3">Edit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
