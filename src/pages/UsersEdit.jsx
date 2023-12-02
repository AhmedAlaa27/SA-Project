import { faCartShopping, faGrip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";
import Loading from "../components/Loading";

function UsersEdit() {

  let { userID } = useParams();
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/profile/" + userID);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async () => {
    try {
      const res = await api.put(`/user/update/${userID}`, {
        name: name,
        email: email
      });
      console.log(res);
      navigate('/users/manage');
    } catch (e) {
      switch (e.response?.status) {
        case 400:
          alert('Please, Enter Valid Data');
          break;
        default:
          alert('Some Error Happend, Try Again Later');
          break;
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  }

  return (
    <Layout>
      <div className="users-edit">
        <div className="container">
          <div className="card card-2">
            <div className="card-header">
              <FontAwesomeIcon className="icon" icon={faGrip} />
              <h4>Edit User</h4>
            </div>
            <div className="card-body">
              {loading ?
                <Loading />
                : <form onSubmit={handleSubmit}>
                  <input disabled type="text" value={userID} className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                  <input defaultValue={user?.name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1" />
                  <input defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" aria-label="password" aria-describedby="basic-addon1" />
                  <button type="submit" className="btn btn-secondary w-25 mt-3">Edit</button>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UsersEdit;