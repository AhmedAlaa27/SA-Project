import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/api";
import Loading from "../components/Loading";
function UsersManage() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/user/list');
            setUsers(res.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = (user) => {
        Swal.fire({
            title: `You sure you want to Delete: "${user.name}"?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                api.delete(`/user/delete/${user.id}`)
                    .then(() => getUsers())
            }
        })
    };

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
                            {loading ?
                                <Loading />
                                :
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-1">#</th>
                                            <th className="col-2">Username</th>
                                            <th className="col-3">Email</th>
                                            <th className="col-2">User Role</th>
                                            <th className="col-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user) => {
                                                return (
                                                    <tr key={user?.id}>
                                                        <th> {user?.id} </th>
                                                        <td> {user?.name} </td>
                                                        <td> {user?.email} </td>
                                                        <td> {user?.role} </td>
                                                        <td className="actions">
                                                            <Link to={`/users/manage/edit/${user.id}`} className="btn btn-warning btn-sm">
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </Link>
                                                            <button onClick={() => deleteUser(user)} className="btn btn-danger btn-sm">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UsersManage;