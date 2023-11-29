import '../App.css';
import { faUser, faList, faCartShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/api';

function Dashboard() {

    const [users, setUsers] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);

    const getUsers = async () => {
        try {
            const res = await api.get('/user/list');
            setUsers(res.data);
        } catch(e) {
            console.log(e);
        }
    }
    const getProducts = async () => {
        try {
            const res = await api.get('/product/list');
            setProducts(res.data);
            console.log(sales);
        } catch(e) {
            console.log(e);
        }
    }
    const getCategories = async () => {
        try {
            const res = await api.get('/category/list');
            setCategories(res.data);
            console.log(sales);
        } catch(e) {
            console.log(e);
        }
    }
    const getSales = async () => {
        try {
            const res = await api.get('/sale/list');
            setSales(res.data);
            console.log(sales);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
        getProducts();
        getCategories();
        getSales();
    }, []);

    return (
        <Layout>
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col box">
                            <div className="icon icon-1">
                                <FontAwesomeIcon className='img' icon={faUser} />
                            </div>
                            <div className="content">
                                <h2> {users.length} </h2>
                                <p>users</p>
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
        </Layout>
    );
}

export default Dashboard;