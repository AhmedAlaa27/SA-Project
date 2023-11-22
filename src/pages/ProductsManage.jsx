import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import userState from "../atoms/UserAtom";

function ProductsManage() {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    return (
        <div className="products-manage">
            <div className="container">
                {
                    (userInfo.role == 'admin')
                    &&
                    <div className="card card-1">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>Add New Product</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" class="form-control" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" />
                            <button className="btn btn-secondary w-25 btn-sm">Add Product</button>
                        </div>
                    </div>
                }
                {
                    (userInfo.role == 'admin' ||
                     userInfo.role == 'special' ||
                     userInfo.role == 'user')
                    &&
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>All Products</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th className="col-1">#</th>
                                        <th className="col-9">Products</th>
                                        {
                                            (userInfo.role == 'admin' ||
                                             userInfo.role == 'special')
                                             &&
                                            <th className="col-2">Actions</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>BMW</td>
                                        {
                                            (userInfo.role == 'admin' ||
                                            userInfo.role == 'special')
                                            &&
                                            <td className="actions">
                                                <button className="btn btn-warning btn-sm">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>Corviette</td>
                                        {
                                            (userInfo.role == 'admin' ||
                                            userInfo.role == 'special')
                                            &&
                                            <td className="actions">
                                                <button className="btn btn-warning btn-sm">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>3</th>
                                        <td>GTX 4090ti</td>
                                        {
                                            (userInfo.role == 'admin' ||
                                            userInfo.role == 'special')
                                            &&
                                            <td className="actions">
                                                <button className="btn btn-warning btn-sm">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>4</th>
                                        <td>Gaming Keyboard</td>
                                        {
                                            (userInfo.role == 'admin' ||
                                            userInfo.role == 'special')
                                            &&
                                            <td className="actions">
                                                <button className="btn btn-warning btn-sm">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <button className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductsManage;