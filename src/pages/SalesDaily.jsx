import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";

function SalesDaily() {

    const [sales, setSales] = useState([]);

    const getSales = async () => {
        try {
            const res = await api.get('/sale/list/daily');
            setSales(res.data);
            console.log(sales);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getSales();
    }, []);

    return (
        <Layout>
            <div className="sales-daily">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>Daily Sales</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th className="col-1">#</th>
                                        <th className="col-5">Product Name</th>
                                        <th className="col-2">Quantity Sold</th>
                                        <th className="col-2">Total</th>
                                        <th className="col-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sales.map((sale) => {
                                            return (
                                                <tr key={sale?.id}>
                                                    <th> {sale?.id} </th>
                                                    <td> {sale?.product?.name} </td>
                                                    <td> {sale?.quantity} </td>
                                                    <td> {sale?.totalPrice} </td>
                                                    <td> {sale?.createdAt.slice(0, 10)} </td>
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

export default SalesDaily;