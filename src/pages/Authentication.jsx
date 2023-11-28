import { useState } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import userLogged from '../atoms/LoggedIn';
import { useNavigate } from 'react-router-dom';

function Authentication() {

    const [isLogged, setIsLogged] = useRecoilState(userLogged);
    let navigate = useNavigate();

    navigate('/login')

    return (
        <div className="authentication">
        </div>
    );
}

export default Authentication;