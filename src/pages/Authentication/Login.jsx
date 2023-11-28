import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import userLogged from "../../atoms/LoggedIn";
import axios from "axios";
import UserRole from "../../atoms/UserRole";
import userName from "../../atoms/UserName";

function Login() {

    const [ loggedIn, setIsLogged ] = useRecoilState(userLogged);
    const [ userRole, setUserRole ] = useRecoilState(UserRole);
    const [ storedName, setStoredName ] = useRecoilState(userName);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ users, setUsers ] = useState([]);
    // const [ exists, setExists ] = useState(null);
    let exists = false;

    let navigate = useNavigate();

    const getUsers = () => {
        axios.get("http://localhost:9000/users").then((data) => setUsers(data.data));
    }

    useEffect(() => {
        getUsers();
    },[])

    const checkUser = () => {
        console.log(users);
        console.log("username: " + username + "\nPassword: " + password);
        users.map((user) => {
            if (user.name == username 
                && user.password == password)
                {
                    exists = true;
                    console.log('10');
                    setStoredName(user.name);
                    setUserRole(user.role);
                }
        })
    }

    const setData = () => {
        console.log(exists);
        if (exists) {
            console.log('20');
            setIsLogged(true);
            navigate('/');
        }
        else {
            setUsername('');
            setPassword('');
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkUser(); 
        setData();
    }

  return (
    <section className="authentication">
        <div className="form-box-login">
            <div className="form-value">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="inputbox">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" required />
                        <label htmlFor="">Username</label>
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                    </div>
                    <div className="inputbox">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required />
                        <FontAwesomeIcon className='icon' icon={faLock} />
                        <label htmlFor="">Password</label>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register">
                        <p>Don't have an account <Link to={'/register'} className='submit'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
export default Login;