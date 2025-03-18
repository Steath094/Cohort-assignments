import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useReducer } from 'react';
import { useRef } from 'react';
const RandomUser =  () => {
  const [userList, setUserList] = useState([])
  const [page,setPage] = useState(1);
  useEffect(()=>{
    const fetchUsers = async () =>{
      try {
        const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=5`);
        
        setUserList(prevValue=>[...prevValue,...response.data.results]);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
    fetchUsers();
    
  },[page])
  const handlepage = () =>{
    setPage(prevValue=> prevValue+1);
  }
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h1>Random User</h1>
      <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto auto',gap:'30px'}}>
      {userList.map((user,index)=>(
        <div key={index} style={{display:'flex',flexDirection:'column', backgroundColor:'gray',padding:'20px',borderRadius:'16px' }}>
        <img src={user.picture?.medium} alt={`${user.name?.first} ${user.name?.last}`} style={{borderRadius:'120px'}} />
        <h2>{`${user.name?.first} ${user.name?.last}`}</h2>
      </div>
      ))}
      </div>
      <button onClick={handlepage} style={{position:'sticky', bottom:'20px', backgroundColor: 'aqua',color: 'black',padding:'14px 20px',margin:'8px 0px',border:'none',cursor:'pointer'}}>Load More</button>
    </div>
  )
}

export default RandomUser