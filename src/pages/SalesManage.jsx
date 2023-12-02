import { faCartShopping, faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import api from "../api/api";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";
import ReactLoading from "react-loading";


function SalesManage() {

    const { user } = useContext(AuthContext);

    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const getSales = async () => {
        setLoading(true);
        try {
            const res = await api.get('/sale/list');
            setSales(res.data);
            console.log(sales);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/product/list');
            setProducts(res.data);
            setProduct(res.data[0])
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
        getSales();
    }, []);

    const deleteSale = (sale) => {
        Swal.fire({
            title: `You sure you want to Delete\nProduct: "${sale.productName}" \nID:"${sale.id}"?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                api.delete(`/sale/delete/${sale.id}`)
                    .then(() => getSales())
            }
        })
    };



    const addSale = async () => {
        setIsCreating(true);
        try {
            const body = {
                quantity: parseInt(quantity),
                totalPrice: parseFloat(totalPrice),
                productId: parseInt(product.id)
            }
            console.log(body);
            const res = await api.post('/sale/create/', {
                ...body
            });
            getSales();
            console.log(res.data);
        } catch (e) {
            console.log(e);
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
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        addSale();
    }
    return (
        <Layout>
            <div className="sales-manage">
                {loading ?
                    <Loading /> :
                    <div className="container">
                        {user?.role == "ADMIN" && <div className="card card-1">
                            <div className="card-header">
                                <FontAwesomeIcon className="icon" icon={faCartShopping} />
                                <h4>Add Sale</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <select required className="form-select my-2" onChange={(e) => {
                                        setProduct(JSON.parse(e.target.value))
                                        setTotalPrice(parseFloat(product.price) * quantity)
                                    }}>
                                        {products.map(p => (
                                            <option value={JSON.stringify(p)}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="row">
                                        <div className="col">
                                            <input required type="number" onChange={(e) => {
                                                setQuantity(e.target.value);
                                                setTotalPrice(e.target.value * product.price);
                                            }} className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                        </div>
                                        <div className="col">
                                            Total price : {totalPrice}
                                        </div>
                                    </div>
                                    <button disabled={isCreating} type="submit" className="btn btn-secondary w-25 btn-sm d-flex justify-content-center align-items-center gap-1">
                                        {isCreating && <ReactLoading type="spin" height="20px" width="20px" />} Add Product
                                    </button>
                                </div>
                            </form>
                        </div>}
                        <div className="card card-2">
                            <div className="card-header">
                                <div className="icon-side">
                                    <FontAwesomeIcon className="icon" icon={faGrip} />
                                    <h4>All Sales</h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-1">#</th>
                                            <th className="col-2">Product Name</th>
                                            <th className="col-2">Product Price</th>
                                            <th className="col-2">Quantity</th>
                                            <th className="col-2">Total</th>
                                            <th className="col-2">Date</th>
                                            {
                                                (user?.role == 'ADMIN')
                                                &&
                                                <th className="col-1">Actions</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales.map((sale) => {
                                                return (
                                                    <tr key={sale?.id}>
                                                        <th> {sale?.id} </th>
                                                        <td> {sale?.product?.name} </td>
                                                        <td> {sale?.product?.price} </td>
                                                        <td> {sale?.quantity} </td>
                                                        <td> {sale?.totalPrice} </td>
                                                        <td> {sale?.createdAt.slice(0, 10)} </td>
                                                        {
                                                            (user?.role == 'ADMIN')
                                                            &&
                                                            <td className="actions">
                                                                <Link to={`/sales/manage/edit/${sale.id}`} className="btn btn-warning btn-sm">
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Link>
                                                                <button onClick={() => deleteSale(sale)} className="btn btn-danger btn-sm">
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        }
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

export default SalesManage;