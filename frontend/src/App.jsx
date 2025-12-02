import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Categories from './pages/Categories'
import RightDetails from './pages/RightDetails'
import CategoryDetails from './pages/CategoryDetails'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Search from './pages/Search'
import FoundationDetails from './pages/FoundationDetails'
import { useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import './App.css'

function App() {
  const {isLoggedin, authData} = useContext(AuthContext)

  return (
    <div style={{width:'100%'}}>
      <Menu/>
      <h3>ברוכים הבאים לאתר מידע לזכויות לאנשים עם מוגבלויות</h3>
      {isLoggedin() ? <h4>שלום {authData.user.fullName}</h4> : <h4>שלום אורח</h4>}
 
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/categories/:categoryId' element={<CategoryDetails/>}/>
        <Route path='/rights/:id' element={<RightDetails/>}/>
        <Route path='/foundations/:id' element={<FoundationDetails/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
      

    </div>
  )
}

export default App
