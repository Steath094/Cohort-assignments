import React, { useContext, useRef } from 'react'
import { context } from '../context/authContext';

const Login = () => {
  const {setUserName,setIsLogin} = useContext(context)
  const inputUser = useRef();
  const inputStyle = {width:'100%',padding: '12px 20px',margin: '8px 0',display: 'inline-block',border: '1px solid #ccc',boxSizing: 'border-box'}
  const handleSubmit = () =>{
    setUserName(inputUser.current.value);
    setIsLogin(true);
  }
  return (
    <div style={{width:'100vw',minHeight:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{display:'flex',flexDirection:'column',width:'30%',fontSize:'1.6rem'}}>
        <label htmlFor="uname"><b>Username</b></label>
        <input type="text" ref={inputUser} placeholder="Enter Username" name="uname" style={inputStyle} required/>
        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" style={inputStyle} required/>
        <button onClick={handleSubmit} type="submit" style={{backgroundColor: '#04AA6D',color: 'white',padding:'14px 20px',margin:'8px 0px',border:'none',cursor:'pointer',width:'100%'}}>Login</button>
    </div>
    </div>
  )
}

export default Login