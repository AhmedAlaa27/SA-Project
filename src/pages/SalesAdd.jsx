import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SalesAdd() {

    const sales_url = "http://localhost:9000/sales";
    const [sales, setSales] = useState([]);
    const getSales = () => {axios.get(sales_url).then((data)=> setSales(data.data))};
    useEffect(() => {
        getSales();
    },[]);

    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const day = today. getDate();
    const currentDate = year + "-" + month + "-" + day;
    
    const [ productName, setProductName ] = useState('');
    const [ productPrice, setProductPrice ] = useState('');
    const [ quantity, setQuantity] = useState('');
    const [ totalPrice, setTotalPrice ] = useState('');

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:9000/sales', {
            id: sales.length + 1,
            quantity: quantity,
            totalPrice: totalPrice,
            productName: productName,
            productPrice: productPrice,
            createdAt: currentDate
        })
        .then((data) => {
            console.log(data);
            navigate('/sales/manage');
        })
    }

    return (
        <div className="sales-add">
            <div className="container">
                <div className="card card-2">
                    <div className="card-header">
                        <FontAwesomeIcon className="icon" icon={faCartShopping} />
                        <h4>Add Sale</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={sales.length + 1} disabled className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                            <input type="text" onChange={(e) => setProductName(e.target.value)} className="form-control mb-4" placeholder="Product-Name" aria-label="productName" aria-describedby="basic-addon1" />
                            <div className="input-group mb-4">
                                <span className="input-group-text">$</span>
                                <input onChange={(e) => setProductPrice(e.target.value)} placeholder="Product-Price" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                            </div>
                            <div className="input-group mb-4">
                                <input onChange={(e) => setQuantity(e.target.value)} type="text" className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                                <span className="input-group-text">Products</span>
                            </div>
                            <div className="input-group mb-4">
                                <span className="input-group-text">$</span>
                                <input onChange={(e) => setTotalPrice(e.target.value)} placeholder="Total-Price" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                            </div>
                            <button className="btn btn-secondary w-25">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesAdd;