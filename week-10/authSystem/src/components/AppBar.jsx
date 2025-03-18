import React, {  useContext } from 'react'
import { context } from '../context/authContext'

const AppBar = () => {
  const {userName,isLogin} = useContext(context)
  return (
    <div style={{backgroundColor:'aqua',height:'80px',display:'flex',alignItems:'center'}}>
      <nav style={{display:'flex',justifyContent:'space-between',width:'100vw',padding:'40px'}}>
        <h1 style={{ fontSize:'2rem'}}>Auth System Demo</h1>
       {isLogin &&  <div style={{display:'flex',gap:'30px',justifyContent:'center',alignItems:'center'}}>
          <h2 style={{ fontSize:'1.6rem'}}>
            Welcome, {userName}!
          </h2>
          <button style={{padding:'10px 20px', fontSize:'1rem', color:'blue',borderRadius:'4px', border:'white'}}>Logout</button>
        </div>}
      </nav>
    </div>
  )
}

export default AppBar