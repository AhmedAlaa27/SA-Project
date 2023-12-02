import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";
import ReactLoading from "react-loading";
import Loading from "../components/Loading";

function SaleEdit() {

    let { saleID } = useParams();
    let navigate = useNavigate();

    const [sale, setSale] = useState([]);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);


    const getSale = async () => {
        setLoading(true);
        try {
            const res = await api.get("/sale/" + saleID);
            setSale(res.data);
            setProduct(res.data.product);
            setQuantity(res.data.quantity);
            setTotalPrice(res.data.totalPrice)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getSale();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const body = {
                quantity,
                totalPrice
            };
            console.log(body);
            const res = await api.put("/sale/update/" + saleID, body)
            console.log(res.data);
            navigate("/sales/manage");
        } catch (error) {
            console.log(error);
        }
        setIsUpdating(false);
    }

    return (
        <Layout>
            <div className="sales-edit">
                {loading ? <Loading /> : <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            <h4>Edit Sale</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                                <select disabled className="form-select">
                                    <option>
                                        {product.name}
                                    </option>
                                </select>
                                <div className="input-group d-flex">
                                    <div className="input-group-text">Quantity</div>
                                    <input value={quantity} onChange={(e) => {
                                        setQuantity(e.target.value);
                                        setTotalPrice(e.target.value * product.price);
                                    }} type="number" className="form-control mb-0" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input disabled value={totalPrice} placeholder="Total-Price" type="number" className="form-control mb-0" aria-label="Amount (to the nearest dollar)" />
                                </div>
                                <button disabled={isUpdating} type="submit" className="btn btn-secondary w-25 btn-sm d-flex justify-content-center align-items-center gap-1">
                                    {isUpdating && <ReactLoading type="spin" height="20px" width="20px" />} Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>}
            </div>
        </Layout>
    );
}

export default SaleEdit;