import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";

const CategoriesEdit = () => {

  let {catID} = useParams();

  const [ cat, setCat ] = useState({});
  const [ catName, setCatName ] = useState("");

  const getCat = async () => {
    try {
      const res = await api.get(`/category/${catID}`);
      setCat(res.data);
      setCatName(res.data.name);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCat();
  },[])

  let navigate = useNavigate();

  const updateCat = async () => {
    try {
      const res = await api.put(`/category/update/${cat.id}`, {
        "Category [edited]": catName
      });
      console.log(res);
      navigate('/categories');
    } catch(e) {
      switch(e?.response?.status) {
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
    updateCat();
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
                      <input disabled type="text" value={cat.id} className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                      <input value={catName} onChange={(e) => setCatName(e.target.value)} type="text" className="form-control" placeholder="Category Name" aria-label="username" aria-describedby="basic-addon1" />
                      <button type="submit" className="btn btn-secondary w-25 mt-3">Edit</button>
                    </form>
                  </div>
              </div>
          </div>
      </div>
    </Layout>
  )
}

export default CategoriesEdit;