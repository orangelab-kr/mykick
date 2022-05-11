import { LoginCheck } from './components/LoginCheck';
import { Started } from './components/started/Started';
import { Login } from './pages/auth/Login';
import { SignupAddress } from './pages/auth/signup/SignupAddress';
import { SignupComplete } from './pages/auth/signup/SignupComplete';
import { SignupIdcard } from './pages/auth/signup/SignupIdcard';
import { SignupInfo } from './pages/auth/signup/SignupInfo';
import { SignupPayments } from './pages/auth/signup/SignupPayments';
import { Token } from './pages/auth/Token';
import { RentActivate } from './pages/rents/Activate';
import { RentDetails } from './pages/rents/Details';
import { RentList } from './pages/rents/List';
import { RentSettings } from './pages/rents/Settings';
import { RentStatus } from './pages/rents/Status';
import { Addons } from './pages/started/Addons';
import { StartedComplete } from './pages/started/Complete';
import { Estimate } from './pages/started/Estimate';
import { Landing } from './pages/started/Landing';
import { MyCare } from './pages/started/MyCare';
import { MySafe } from './pages/started/MySafe';
import { Pricing } from './pages/started/Pricing';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

export const Router = () => {
  const redirect = (to) => <Navigate to={to} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<LoginCheck />} />
          <Route path='*' element={redirect('/')} />
          <Route path='started' element={<Started />}>
            <Route index element={<Landing />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='mysafe' element={<MySafe />} />
            <Route path='mycare' element={<MyCare />} />
            <Route path='addons' element={<Addons />} />
            <Route path='estimate' element={<Estimate />} />
            <Route path='complete' element={<StartedComplete />} />
          </Route>
          <Route path='rents' element={<Started />}>
            <Route index element={<RentList />} />
            <Route path=':rentId' element={<RentDetails />} />
            <Route path=':rentId/status' element={<RentStatus />} />
            <Route path=':rentId/activate' element={<RentActivate />} />
            <Route path=':rentId/settings' element={<RentSettings />} />
          </Route>
          <Route path='auth' element={<Started />}>
            <Route index element={redirect('/auth/login')} />
            <Route path='*' element={redirect('/auth/login')} />
            <Route path='login' element={<Login />} />
            <Route path='token' element={<Token />} />
            <Route path='signup'>
              <Route index element={redirect('/auth/signup/info')} />
              <Route path='*' element={redirect('/auth/signup/info')} />
              <Route path='info' element={<SignupInfo />} />
              <Route path='address' element={<SignupAddress />} />
              <Route path='idcard' element={<SignupIdcard />} />
              <Route path='complete' element={<SignupComplete />} />
              <Route path='payments' element={<SignupPayments />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
