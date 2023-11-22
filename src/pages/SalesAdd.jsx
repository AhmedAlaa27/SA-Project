import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SalesAdd() {
    return (
        <div className="sales-add">
            <div className="container">
                <div className="card card-2">
                    <div className="card-header">
                        <FontAwesomeIcon className="icon" icon={faCartShopping} />
                        <h4>Add Sale</h4>
                    </div>
                    <div className="card-body">
                        <input type="text" className="form-control mb-4" placeholder="Product-Name" aria-label="productName" aria-describedby="basic-addon1" />
                        <div className="input-group mb-4">
                            <input type="number" className="form-control" placeholder="Quantity" aria-label="quantity" aria-describedby="basic-addon1" />
                            <span className="input-group-text">Products</span>
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text">$</span>
                            <input placeholder="Total" type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                            <span className="input-group-text">.00</span>
                        </div>
                        <button className="btn btn-secondary w-25">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesAdd;