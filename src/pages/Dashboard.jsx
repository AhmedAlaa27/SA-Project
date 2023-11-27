import '../App.css';
import { faUser, faList, faCartShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Dashboard() {

    const api_url = "http://localhost:9000";
    const users_url = api_url + "/users";
    const products_url = api_url + "/products";
    const cats_url = api_url + "/categories";
    const sales_url = api_url + "/sales";

    const [users, setUsers] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);

    const getUsers = () => {axios.get(users_url).then((data)=> setUsers(data.data))};
    const getProducts = () => {axios.get(products_url).then((data)=> setProducts(data.data))};
    const getCategories = () => {axios.get(cats_url).then((data)=> setCategories(data.data))};
    const getSales = () => {axios.get(sales_url).then((data)=> setSales(data.data))};

    console.log(users[0]);

    useEffect(() => {
        getUsers();
        getProducts();
        getCategories();
        getSales();
    }, []);

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col box">
                        <div className="icon icon-1">
                            <FontAwesomeIcon className='img' icon={faUser} />
                        </div>
                        <div className="content">
                            <h2> {users.length} </h2>
                            <p> users </p>
                        </div>
                    </div>
                    <div className="col box">
                        <div className="icon icon-2">
                        <FontAwesomeIcon className='img' icon={faList} />
                        </div>
                        <div className="content">
                            <h2> {categories.length} </h2>
                            <p>Categories</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col box">
                        <div className="icon icon-3">
                        <FontAwesomeIcon className='img' icon={faCartShopping} />
                        </div>
                        <div className="content">
                            <h2> {products.length} </h2>
                            <p>Products</p>
                        </div>
                    </div>
                    <div className="col box">
                        <div className="icon icon-4">
                        <FontAwesomeIcon className='img' icon={faDollarSign} />
                        </div>
                        <div className="content">
                            <h2> {sales.length} </h2>
                            <p>Sales</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;