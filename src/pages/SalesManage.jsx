import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function SalesManage() {
    return (
        <div className="sales-manage">
            <div className="container">
                <div className="card card-2">
                    <div className="card-header">
                        <div className="icon-side">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>All Sales</h4>
                        </div>
                        <Link to={'/sales/manage/add'} className="btn btn-secondary">Add Sale</Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-1">#</th>
                                    <th className="col-4">Product Name</th>
                                    <th className="col-2">Quantity</th>
                                    <th className="col-2">Total</th>
                                    <th className="col-2">Date</th>
                                    <th className="col-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Seer Katina</td>
                                    <td>3</td>
                                    <td>750.00</td>
                                    <td>2023-11-20</td>
                                    <td className="actions">
                                        <button className="btn btn-warning btn-sm">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Messi</td>
                                    <td>30</td>
                                    <td>600.00</td>
                                    <td>2023-11-18</td>
                                    <td className="actions">
                                        <button className="btn btn-warning btn-sm">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>Aboubakr</td>
                                    <td>1</td>
                                    <td>20.00</td>
                                    <td>2023-11-18</td>
                                    <td className="actions">
                                        <button className="btn btn-warning btn-sm">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>Boujeh</td>
                                    <td>4</td>
                                    <td>250.00</td>
                                    <td>2023-11-18</td>
                                    <td className="actions">
                                        <button className="btn btn-warning btn-sm">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesManage;