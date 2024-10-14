import LoginForm from './components/login';
import RegisterForm from './components/register';
import DashboardPage from './components/dashboard';
import './assets/css/style.scss';
import Cart from './components/cart';
import Checkout from './components/checkout';
import MyOrders from './components/myOrders';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/dashboard' element={<DashboardPage />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/myorders' element={<MyOrders />}></Route>
        </Routes>
      </BrowserRouter>
    </> 

  );
}

export default App;
