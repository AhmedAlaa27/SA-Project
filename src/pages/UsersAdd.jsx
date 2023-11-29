import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css'
import Layout from "../components/Layout";

function ProductsAdd() {
    return (
        <Layout>
            <div className="users-add">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faGrip} />
                            <h4>Add User</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1" />
                            <input type="password" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                            <input type="password" className="form-control" placeholder="confirm-password" aria-label="password" aria-describedby="basic-addon1" />
                            <select id="role" className="form-select" aria-label="Default select example">
                                <option disabled>Role</option>
                                <option value="admin">Admin</option>
                                <option value="user" selected>User</option>
                                <option value="special">Special</option>
                            </select>
                            <button className="btn btn-secondary w-25 mt-3">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default ProductsAdd;