import { Link } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
            <Link style={{color: 'grey', fontWeight: 'bold'}} className="logo navbar-brand" to="/home">Inventory</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse nav-links" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <span style={{color: 'grey'}} className="nav-link active" aria-current="page">November 20 2023</span>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                        <FontAwesomeIcon icon={faUser} /> <span>Admin User</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to={'/profile'} className="dropdown-item" href="#">Profile</Link></li>
                        <li><Link className="dropdown-item" to={'./'}>Logout</Link></li>
                    </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;