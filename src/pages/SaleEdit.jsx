import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

function SaleEdit() {

    let { saleID } = useParams();
    let navigate = useNavigate();

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    const currentDate = year + "-" + month + "-" + day;

    const sale_url = `http://localhost:9000/sales/${saleID}`;
    const [sale, setSale] = useState([]);
    const [saleProductName, setSaleProductName] = useState([]);
    const [saleQuantity, setSaleQuantity] = useState([]);
    const [salePrice, setSalePrice] = useState([]);
    useEffect(() => {
        axios.get(sale_url)
            .then((data) => {
                setSale(data.data);
                setSaleProductName(data.data.productName);
                setSaleQuantity(data.data.quantity);
                setSalePrice(data.data.totalPrice);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSale = {
            ...sale,
            quantity: saleQuantity,
            totalPrice: salePrice,
            createdAt: currentDate
        };

        axios.put(`http://localhost:9000/sales/${saleID}`, updatedSale)
            .then((data) => navigate('/sales/manage'));
    }

    return (
        <Layout>
            <div className="sales-edit">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            <h4>Edit Sale</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input disabled value={saleProductName} onChange={(e) => setSaleProductName(e.target.value)} type="text" className="form-control mb-4" placeholder="Product-Name" aria-label="productName" aria-describedby="basic-addon1" />
                                <div className="input-group mb-4">
                                    <input value={saleQuantity} onChange={(e) => setSaleQuantity(e.target.value)} type="text" className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                    <span className="input-group-text">Products</span>
                                </div>
                                <div className="input-group mb-4">
                                    <span className="input-group-text">$</span>
                                    <input value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="Total-Price" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                </div>
                                <button className="btn btn-secondary w-25">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SaleEdit;