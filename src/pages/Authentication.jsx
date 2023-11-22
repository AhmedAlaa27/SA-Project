import { useState } from 'react';
import '../App.css'

function Authentication() {

    const [register, setRegister] = useState(true);

    const login = () => {
        setRegister(false);
    }
    const Register = () => {
        setRegister(true);
    }

    return (
        <div className="authentication">
            {
                (register)
                ?
                <div className="container">
                    <div className="header">
                        <div className="text">Sign Up</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder='username...'/>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='password...' />
                        </div>
                        <div className="input">
                            <input type="password" placeholder='confirm-password...' />
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit">Sign Up</div>
                        <div className="submit" onClick={() => login()}>Login</div>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="header">
                        <div className="text">Log In</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder='username...'/>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='password...' />
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit" onClick={() => Register()}>Sign Up</div>
                        <div className="submit">Login</div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Authentication;