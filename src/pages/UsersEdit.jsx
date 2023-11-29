import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";

function UsersEdit() {

  let {userID} = useParams();
  let navigate = useNavigate();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ role, setRole ] = useState('user');
  const [ password, setPassword ] = useState('');
  
  const [ users, setUsers ] = useState([]);
  const getUsers = async () => {
    try {
        const res = await api.get('/user/profile');
        setUsers(res.data);
    } catch(e) {
        console.log(e);
    }
  }

  useEffect(() => {
      getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...users,
      name: name,
      email: email,
      role: role,
      password: password
  };

  axios.put(`http://localhost:9000/users/${userID}`, updatedUser)
      .then((data) => navigate('/users/manage'));
  }

  return (
    <Layout>
      <div className="users-edit">
          <div className="container">
              <div className="card card-2">
                  <div className="card-header">
                      <FontAwesomeIcon className="icon" icon={faCartShopping} />
                      <h4>Edit User</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <input disabled type="text" value={users.id} className="form-control mb-4" placeholder="ID" aria-label="productName" aria-describedby="basic-addon1" />
                      <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon1" />
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" aria-label="password" aria-describedby="basic-addon1" />
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                      <input value={role} onChange={(e) => setRole(e.target.value)} type="text" className="form-control" placeholder="Role" aria-label="password" aria-describedby="basic-addon1" />
                      <button type="submit" className="btn btn-secondary w-25 mt-3">Edit</button>
                  </form>
                  </div>
              </div>
          </div>
      </div>
    </Layout>
  )
}

export default UsersEdit;