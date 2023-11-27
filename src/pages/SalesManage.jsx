import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../atoms/UserAtom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function SalesManage() {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    const sales_url = "http://localhost:9000/sales";
    const [sales, setSales] = useState([]);
    const getSales = () => {axios.get(sales_url).then((data)=> setSales(data.data))};
    useEffect(() => {
        getSales();
    }, []);

    const deleteSale = (sale) => {
        Swal.fire({
            title: `Are you sure to Delete "${sale.id}"?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                axios.delete(`http://localhost:9000/sales/${sale.id}`)
                .then(() => getSales())
            }
        })
    };

    return (
        <div className="sales-manage">
            <div className="container">
                <div className="card card-2">
                    <div className="card-header">
                        <div className="icon-side">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>All Sales</h4>
                        </div>
                        {
                            (userInfo.role == 'admin')
                            &&
                        <Link to={'/sales/manage/add'} className="btn btn-secondary">Add Sale</Link>
                        }
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
                                        (userInfo.role == 'admin' ||
                                        userInfo.role == 'special')
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
                                            <td> {sale?.productName} </td>
                                            <td> {sale?.productPrice} </td>
                                            <td> {sale?.quantity} </td>
                                            <td> {sale?.totalPrice} </td>
                                            <td> {sale?.createdAt.slice(0, 10)} </td>
                                            {
                                                (userInfo.role == 'admin' ||
                                                userInfo.role == 'special')
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
    );
}

export default SalesManage;