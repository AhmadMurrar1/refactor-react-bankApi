import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/Home';
import './App.css'
import UserDetails from './assets/UserDetails';
import Transaction from './assets/Transaction';
import EditUser from './assets/EditUser';
import CreateUser from './assets/CreateUser';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/transactions' element={<Transaction/>}/>
      <Route path='/user-details/:userId' element={<UserDetails/>}/>
      <Route path='/:userId' element={<EditUser/>}/>
      <Route path='/create-user' element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
