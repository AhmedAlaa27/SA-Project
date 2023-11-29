import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
function UsersManage() {
    return (
        <Layout>
            <div className="users-manage">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <div className="icon-side">
                                <FontAwesomeIcon className="icon" icon={faGrip} />
                                <h4>All Users</h4>
                            </div>
                            <Link to={'/users/manage/add'} className="btn btn-secondary btn">Add User</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th className="col-1">#</th>
                                        <th className="col-3">Username</th>
                                        <th className="col-3">Password</th>
                                        <th className="col-2">User Role</th>
                                        <th className="col-1">Status</th>
                                        <th className="col-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Admin</td>
                                        <td>admin</td>
                                        <td>Admin</td>
                                        <td className="status"><button className="btn btn-sm btn-success disabled">Active</button></td>
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
                                        <td>User</td>
                                        <td>user1</td>
                                        <td>User</td>
                                        <td className="status"><button className="btn btn-sm btn-success disabled">Active</button></td>
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
                                        <td>User</td>
                                        <td>user2</td>
                                        <td>User</td>
                                        <td className="status"><button className="btn btn-sm btn-success disabled">Active</button></td>
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
                                        <td>Special</td>
                                        <td>special</td>
                                        <td>Special</td>
                                        <td className="status"><span className="btn btn-sm btn-success disabled">Active</span></td>
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
        </Layout>
    );
}

export default UsersManage;