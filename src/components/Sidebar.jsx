import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faBarsStaggered, faBorderAll, faImage, faChartBar, faSignal } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar bg-dark">
            <ul className="list-group list-group-flush">
                <div className="container">
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                            <FontAwesomeIcon className='icon' icon={faHouse} beat />
                            <Link className='span' to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                            <FontAwesomeIcon className='icon' icon={faUser} beat />
                            <Link className='span' to={'/users/manage'}>Users Management</Link>
                        </li>
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                        <FontAwesomeIcon className='icon'  icon={faBarsStaggered} beat />
                            <Link className='span' to={'/categories'}>Categories</Link>
                        </li>
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                            <FontAwesomeIcon className='icon' icon={faBorderAll} beat />
                            <Link className='span' to={'/products/manage'}>Products</Link>
                        </li>
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                            <FontAwesomeIcon className='icon' icon={faChartBar} beat />
                            <Link className='span' to={'/sales/manage'}>Manage Sales</Link>
                        </li>
                        <li className="list-group-item pt-3 pb-3 fw-bold text-bg-dark">
                        <FontAwesomeIcon className='icon' icon={faSignal} beat />
                            <span className='span'>
                                <a className="toggle-link" data-bs-toggle="collapse" href="#collapseSalesReport" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    Sales
                                </a>
                                <div className="collapse" id="collapseSalesReport">
                                    <ul className="list-group">
                                        <Link to={'/sales/mothly-sales'} className="toggle-list list-group-item bg-dark">
                                            Monthly sales
                                        </Link>
                                        <Link to={'/sales/daily-sales'} className="toggle-list list-group-item bg-dark">
                                            Daily sales
                                        </Link>
                                    </ul>
                                </div>
                            </span>
                        </li>
                </div>
            </ul>
        </div>
    );
}

export default Sidebar;