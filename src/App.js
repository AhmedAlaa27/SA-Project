import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories';
import ProductsManage from './pages/ProductsManage';
import UsersAdd from './pages/UsersAdd';
import UsersManage from './pages/UsersManage'
import UsersEdit from './pages/UsersEdit';
import SalesMonthly from './pages/SalesMonthly';
import SalesDaily from './pages/SalesDaily';
import Profile from './pages/Profile';
import SalesManage from './pages/SalesManage';
import SalesAdd from './pages/SalesAdd';
import SaleEdit from './pages/SaleEdit';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import CategoriesEdit from './pages/CategoriesEdit';
import ProductsEdit from './pages/ProductsEdit';

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
      <Route path='/users/manage/edit/:userID' element={<UsersEdit />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/categories/manage/edit/:catID' element={<CategoriesEdit />} />
      <Route path='/products/manage' element={<ProductsManage />} />
      <Route path='/products/manage/edit/:productID' element={<ProductsEdit />} />
      <Route path='/sales/manage' element={<SalesManage />} />
      <Route path='/sales/manage/add' element={<SalesAdd />} />
      <Route path='/sales/manage/edit/:saleID' element={<SaleEdit />} />
      <Route path='/sales/mothly-sales' element={<SalesMonthly />} />
      <Route path='/sales/daily-sales' element={<SalesDaily />} />
      <Route path='/profile/:userID' element={< Profile />} />
    </Routes>
  );
}

export default App;
