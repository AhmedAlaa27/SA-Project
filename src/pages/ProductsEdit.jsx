import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ReactLoading from "react-loading"

export default function ProductsEdit() {

  let { productID } = useParams();

  const [product, setProduct] = useState({});
  const [cats, setCats] = useState([]);

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [catID, setCatID] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product/${productID}`);
      setProduct(res.data);
      setProductName(res.data?.name);
      setPrice(res.data?.price);
      setCatID(res.data.category.id);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const getCats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/category/list");
      setCats(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
    getCats();
  }, [])

  let navigate = useNavigate();

  const updateProduct = async () => {
    setIsUpdating(true)
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
    setIsUpdating(false);
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
              <h4>Edit Product</h4>
            </div>
            {loading ? <Loading /> : <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input disabled type="text" value={product.id} className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" placeholder="Product Name" aria-label="username" aria-describedby="basic-addon1" />
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" placeholder="Product Price" aria-label="username" aria-describedby="basic-addon1" />
                <select className="form-select" onChange={e => setCatID(e.target.value)}>
                  {cats.map(cat => (
                    <option value={cat.id} selected={cat.id == product.category?.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button disabled={isUpdating} type="submit" className="btn btn-secondary d-flex justify-content-center align-items-center">
                  {isUpdating && <ReactLoading type="spin" height="20px" width="20px" />} Edit
                </button>
              </form>
            </div>}
          </div>
        </div>
      </div>
    </Layout >
  )
}
