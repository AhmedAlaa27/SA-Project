import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar';
import Categories from './pages/Categories';
import ProductsManage from './pages/ProductsManage';
import UsersAdd from './pages/UsersAdd';
import SalesManage from './pages/SalesManage';
import UsersManage from './pages/UsersManage'
import SalesMonthly from './pages/SalesMonthly';
import SalesDaily from './pages/SalesDaily';
import Profile from './pages/Profile';
import SalesAdd from './pages/SalesAdd';
import { useRecoilState } from 'recoil';
import userLogged from './atoms/LoggedIn';
import SaleEdit from './pages/SaleEdit';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/users/manage' element={<UsersManage />} />
      <Route path='/users/manage/add' element={<UsersAdd />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/products/manage' element={<ProductsManage />} />
      <Route path='/sales/manage' element={<SalesManage />} />
      <Route path='/sales/manage/add' element={<SalesAdd />} />
      <Route path='/sales/manage/edit/:saleID' element={<SaleEdit />} />
      <Route path='/sales/mothly-sales' element={<SalesMonthly />} />
      <Route path='/sales/daily-sales' element={<SalesDaily />} />
      <Route path='/profile' element={< Profile />} />
    </Routes>
  );
}

export default App;
