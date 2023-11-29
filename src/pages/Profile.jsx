import { faUserPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout";

function Profile() {
    return (
        <Layout>
            <div className="profile">
                <div className="container">
                    <div className="card card-1">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faUserPen} />
                            <h4>Change My Photo</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" class="form-control" placeholder="Choose Pic" aria-label="profilePicture" aria-describedby="basic-addon1" />
                            <button className="btn btn-warning w-25 btn-sm">Change</button>
                        </div>
                    </div>
                    <div className="card card-2">
                        <div className="card-header">
                            <FontAwesomeIcon className="icon" icon={faPenToSquare} />
                            <h4>Edit My Account</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" class="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1" />
                            <input type="password" class="form-control" placeholder="old-password" aria-label="password" aria-describedby="basic-addon1" />
                            <input type="password" class="form-control" placeholder="new-password" aria-label="password" aria-describedby="basic-addon1" />
                            <button className="btn btn-danger w-25 btn-sm">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;