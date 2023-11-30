import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


function ProductsManage() {
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const res = await api.get('/product/list');
            setProducts(res.data);
        } catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getProducts();
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

    const [ productName, setProductName ] = useState('');
    const [ productPrice, setProductPrice ] = useState(0);
    const [ catID, setCatID ] = useState(0);

    const addProduct = async () => {
        try {
            const res = await api.post('/product/create/', {
                name: productName,
                price: parseFloat(productPrice),
                categoryId: parseFloat(catID)
            },
            {
                headers: { "Content-type": "application/json" },
            });
            getProducts();
            console.log(res.data);
        } catch(e) {
            switch(e.respose?.status) {
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
        addProduct();
    }

    return (
        <Layout>
            <div className="products-manage">
                <div className="container">
                    <div className="card card-1">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>Add New Product</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <input required onChange={(e) => setProductName(e.target.value)} type="text" class="form-control" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setProductPrice(e.target.value)} type="text" class="form-control" placeholder="Product Price" aria-label="Username" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setCatID(e.target.value)} type="text" class="form-control" placeholder="Category ID" aria-label="Username" aria-describedby="basic-addon1" />
                                <button type="submit" className="btn btn-secondary w-25 btn-sm">Add Product</button>
                            </div>
                        </form>
                    </div>
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
                                        <th className="col-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    products.map((product) => {
                                        return (
                                            <tr key={product?.id}>
                                                <th> {product?.id} </th>
                                                <td> {product?.name} </td>
                                                <td className="actions">
                                                    <Link to={`/products/manage/edit/${product.id}`} className="btn btn-warning btn-sm">
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </Link>
                                                    <button onClick={() => deleteProduct(product)} className="btn btn-danger btn-sm">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductsManage;