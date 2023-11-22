import '../App.css';
import { faUser, faList, faCartShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col box">
                        <div className="icon icon-1">
                            <FontAwesomeIcon className='img' icon={faUser} />
                        </div>
                        <div className="content">
                            <h2>3</h2>
                            <p>Users</p>
                        </div>
                    </div>
                    <div className="col box">
                        <div className="icon icon-2">
                        <FontAwesomeIcon className='img' icon={faList} />
                        </div>
                        <div className="content">
                            <h2>4</h2>
                            <p>Categories</p>
                        </div>
                    </div>
                    <div className="col box">
                        <div className="icon icon-3">
                        <FontAwesomeIcon className='img' icon={faCartShopping} />
                        </div>
                        <div className="content">
                            <h2>2</h2>
                            <p>Products</p>
                        </div>
                    </div>
                    <div className="col box">
                        <div className="icon icon-4">
                        <FontAwesomeIcon className='img' icon={faDollarSign} />
                        </div>
                        <div className="content">
                            <h2>5</h2>
                            <p>Sales</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;