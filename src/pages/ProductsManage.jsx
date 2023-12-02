import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import ReactLoading from "react-loading";

function ProductsManage() {
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [cats, setCats] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [catID, setCatID] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/product/list');
            setProducts(res.data);
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
        getProducts();
        getCats();
    }, []);

    const deleteProduct = (product) => {
        Swal.fire({
            title: `You sure you want to Delete\nProduct: "${product.name}"?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                api.delete(`/product/delete/${product.id}`)
                    .then(() => getProducts())
            }
        })
    };


    const addProduct = async () => {
        setIsCreating(true);
        try {
            const res = await api.post('/product/create/', {
                name: productName,
                price: parseFloat(productPrice),
                categoryId: parseFloat(catID)
            },
                {
                    headers: { "Content-type": "application/json" },
                });
            console.log(res.data);
        } catch (e) {
            switch (e.respose?.status) {
                case 400:
                    alert('Please, Enter Valid Data');
                    break;
                default:
                    alert('Some Error Has Happend, Try Again Later');
                    break;
            }
        }
        setIsCreating(false);
        getProducts();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    }

    return (
        <Layout>
            <div className="products-manage">
                {loading ? <Loading />
                    : <div className="container">
                        {
                            user?.role == "ADMIN" && <div className="card card-1">
                                <div className="card-header">
                                    <FontAwesomeIcon className="icon" icon={faGrip} />
                                    <h4>Add New Product</h4>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <input required onChange={(e) => setProductName(e.target.value)} type="text" class="form-control" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" />
                                        <div className="row">
                                            <div className="col">
                                                <input required onChange={(e) => setProductPrice(e.target.value)} type="number" class="form-control " placeholder="Product Price" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                            <div className="col">
                                                <select aria-label="select" onChange={(e) => setCatID(e.target.value)} class="form-select">
                                                    {cats.map(cat => (
                                                        <option value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button disabled={isCreating} type="submit" className="btn btn-secondary w-25 btn-sm d-flex justify-content-center align-items-center gap-1">
                                            {isCreating && <ReactLoading type="spin" height="20px" width="20px" />} Add Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div className="card card-2">
                            <div className="card-header">
                                <FontAwesomeIcon className="icon" icon={faGrip} />
                                <h4>All Products</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-1">#</th>
                                            <th className="col-9">Products</th>
                                            {user?.role == "ADMIN" && <th className="col-2">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product) => {
                                                return (
                                                    <tr key={product?.id}>
                                                        <th> {product?.id} </th>
                                                        <td> {product?.name} </td>
                                                        {user?.role == 'ADMIN' &&
                                                            <td className="actions">
                                                                <Link to={`/products/manage/edit/${product.id}`} className="btn btn-warning btn-sm">
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Link>
                                                                <button onClick={() => deleteProduct(product)} className="btn btn-danger btn-sm">
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>}
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}
            </div>
        </Layout>
    );
}

export default ProductsManage;