import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import api from "../api/api";

function SalesAdd() {

    const [productID, setProductID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    let navigate = useNavigate();

    const addSale = async () => {
        try {
            const res = await api.post('/sale/create/', {
                quantity: quantity,
                totalPrice: totalPrice,
                productID: productID,
            });
            console.log(res.data);
            navigate('/sales/manage');
        } catch(e) {
            switch (e.response?.status) {
                case 400:
                    alert('Please, Enter Valid Data');
                    break;
                default:
                    alert("Some error happend, try again later");
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
            <div className="sales-add">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            <h4>Add Sale</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input required type="number" onChange={(e) => setProductID(e.target.value)} className="form-control mb-4" placeholder="Product-ID" aria-label="productName" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setQuantity(e.target.value)} type="number" className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setTotalPrice(e.target.value)} placeholder="Total-Price" type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                <button className="btn btn-secondary w-25">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SalesAdd;