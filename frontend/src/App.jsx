import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Categories from './pages/Categories'
import RightDetails from './pages/RightDetails'
import CategoryDetails from './pages/CategoryDetails'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Search from './pages/Search'
import UserPage from './pages/UserPage'
import UserList from './pages/UserList'
import FoundationDetails from './pages/FoundationDetails'
import { useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import './App.css'

function App() {
  const {isLoggedin, authData} = useContext(AuthContext)

  return (
    <div style={{width:'100%'}}>
      <Menu/>
      <div className='welcome'>

      <h3 className='welcome-title' >ברוכים הבאים לאתר מידע לזכויות לאנשים עם מוגבלויות</h3>
      <h4 className='welcome-greeting'>שלום {isLoggedin() ? authData.user.fullName:'שלום אורח'}</h4>
      </div>
 
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/categories/:categoryId' element={<CategoryDetails/>}/>
        <Route path='/rights/:id' element={<RightDetails/>}/>
        <Route path='/foundations/:id' element={<FoundationDetails/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/users/:userId' element={<UserPage/>}/>
      </Routes>
      

    </div>
  )
}

export default App
