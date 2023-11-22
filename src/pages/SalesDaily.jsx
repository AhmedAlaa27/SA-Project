import { faGrip} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SalesDaily() {
    return (
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
                                <tr>
                                    <th>1</th>
                                    <td>boujehh</td>
                                    <td>30</td>
                                    <td>6620.00</td>
                                    <td>2023-11-21</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Seer Katina</td>
                                    <td>1</td>
                                    <td>250.00</td>
                                    <td>2023-11-21</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>boujehh</td>
                                    <td>3</td>
                                    <td>6620.00</td>
                                    <td>2023-11-21</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesDaily;