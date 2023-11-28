import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import userLogged from "../../atoms/LoggedIn";

function Register() {

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLogged);

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const day = today. getDate();
    const currentDate = year + "-" + month + "-" + day;

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // axios.post('http://localhost:9000/users', {
        //     name: username,
        //     email: email,
        //     role: "User",
        //     password: password,
        //     lastLogin: currentDate
        // })
    }

  return (
    <section className="authentication">
        <div className="form-box-register">
            <div className="form-value">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="inputbox">
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        <input onChange={(e) => setEmail(e.target.value)} type="email" required />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputbox">
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        <input onChange={(e) => setUsername(e.target.value)} type="text" required />
                        <label htmlFor="">Username</label>
                    </div>
                    <div className="inputbox">
                        <FontAwesomeIcon className='icon' icon={faLock} />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required />
                        <label htmlFor="">Password</label>
                    </div>
                    <div className="inputbox">
                        <FontAwesomeIcon className='icon' icon={faLock} />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <button>Register</button>
                    <div className="register">
                        <p>Already have an account <Link to={'/login'} className='submit'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register;