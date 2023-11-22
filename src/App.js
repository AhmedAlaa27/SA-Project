import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import Authentication from './pages/Authentication';

function App() {
  return (
    <div className="App">
      < Navbar />
      <div className='container-fluid main-body'>
        <div className='row'>
          <div className='col-2'>< Sidebar /></div>
          <div className='col-10'>
            <Routes>
              < Route path='/' element={< Authentication />} />
              < Route path='/home' element={< Home />} />
              < Route path='/dashboard' element={< Dashboard />} />
              < Route path='/users/manage' element={< UsersManage />} />
              < Route path='/users/manage/add' element={< UsersAdd />} />
              < Route path='/categories' element={< Categories />} />
              < Route path='/products/manage' element={< ProductsManage />} />
              < Route path='/sales/manage' element={< SalesManage />} />
              < Route path='/sales/manage/add' element={< SalesAdd />} />
              < Route path='/sales/mothly-sales' element={< SalesMonthly />} />
              < Route path='/sales/daily-sales' element={< SalesDaily />} />
              < Route path='/profile' element={< Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
