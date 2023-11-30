import { faCartShopping, faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import UserRole from "../atoms/UserRole";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import api from "../api/api";

function SalesManage() {

    const [userRole, setUserRole] = useRecoilState(UserRole);

    const [sales, setSales] = useState([]);

    const getSales = async () => {
        try {
            const res = await api.get('/sale/list');
            setSales(res.data);
            console.log(sales);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
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

    const [productID, setProductID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addSale = async () => {
        try {
            const res = await api.post('/sale/create/', {
                quantity: parseFloat(quantity),
                totalPrice: parseFloat(totalPrice),
                productID: parseFloat(productID)
            },
            {
                headers: { "Content-type": "application/json" },
            });
            getSales();
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
        addSale();
    }

    return (
        <Layout>
            <div className="sales-manage">
                <div className="container">
                    <div className="card card-1">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            <h4>Add Sale</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                {/* <div className="inputs"> */}
                                    <input required type="text" onChange={(e) => setProductID(e.target.value)} className="form-control mb-4" placeholder="Product-ID" aria-label="productName" aria-describedby="basic-addon1" />
                                    <input required type="text" onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                    <input required type="text" onChange={(e) => setTotalPrice(e.target.value)} placeholder="Total-Price" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                {/* </div> */}
                                <button type="submit" className="btn btn-secondary w-25">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="card card-2">
                        <div className="card-header">
                            <div className="icon-side">
                                <FontAwesomeIcon className="icon" icon={faGrip} />
                                <h4>All Sales</h4>
                            </div>
                            {/* {
                                (userRole == 'admin')
                                &&
                                <Link to={'/sales/manage/add'} className="btn btn-secondary">Add Sale</Link>
                            } */}
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
                                            (userRole == 'admin')
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
                                                        (userRole == 'admin')
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
                </div>
            </div>
        </Layout>
    );
}

export default SalesManage;