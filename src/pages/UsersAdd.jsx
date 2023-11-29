import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css'
import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function ProductsAdd() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState('user');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    let navigate = useNavigate();

    const checkPassword = () => {
        if (password != confirmPassword) alert('Password must match');
    }

    const addUser = async () => {
        try {
            const res = await api.post('/user/add', {
                name: name,
                email: email,
                password: password,
                role: role
            });
            console.log(res.data);
            navigate('/users/manage');
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
        checkPassword();
        addUser();
    }

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
                            <form onSubmit={handleSubmit}>
                                <input required onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" aria-label="password" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                                <input required onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="confirm-password" aria-label="password" aria-describedby="basic-addon1" />
                                <select required onChange={(e) => setRole(e.target.value)} id="role" className="form-select" aria-label="Default select example">
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER" selected>User</option>
                                </select>
                                <button type="submit" className="btn btn-secondary w-25 mt-3">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default ProductsAdd;