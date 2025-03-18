import React, { useContext } from 'react'
import AppBar from './AppBar'
import Login from './Login'
import Home from './Home'
import { context } from '../context/authContext'
const AuthSystem = () => {
  const {isLogin} = useContext(context)
  return (
    <div>
      <AppBar  ></AppBar>
      {!isLogin?<Login />:<Home/>}
    </div>
  )
}

export default AuthSystem