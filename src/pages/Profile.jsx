import { faUserPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function Profile() {

    let { userID } = useParams();

    const [user, setUser] = useState({})
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    let navigate = useNavigate()

    const updateProfile = async () => {
        try {
            const res_1 = await api.put(`/user/update/${userID}`, {
                name: username,
                email: email
            });
            console.log(res_1.data);
            const res_2 = await api.put(`/user/change-password`, {
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            console.log(res_2.data);
            navigate('/home');
        } catch (e) {
            switch (e?.response?.status) {
                case 400:
                    alert('Please, Enter Valid Data');
                    break;
                default:
                    alert("Some error happend, try again later");
                    break;
            }
        }
    }

    const formsubmit = (e) => {
        e.preventDefault();
        updateProfile();
    }

    return (
        <Layout>
            <div className="profile">
                <div className="container">
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                            <h4>Edit My Account</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formsubmit}>
                                <input type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <input type="email" className="form-control" placeholder="Email" aria-label="username" aria-describedby="basic-addon1"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input type="Password" className="form-control" placeholder="old-Password" aria-label="Password" aria-describedby="basic-addon1"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <input type="Password" className="form-control" placeholder="new-Password" aria-label="Password" aria-describedby="basic-addon1"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button className="btn btn-danger w-25 btn-sm" type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;