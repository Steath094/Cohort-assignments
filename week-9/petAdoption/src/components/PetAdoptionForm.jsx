import React, { useState,useEffect } from 'react'

const PetAdoptionForm = ({handleDataChange,toggleView}) => {
  const [inputs, setInputs] = useState({});
  
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(handleDataChange);
    
    handleDataChange(inputs);
    
    // Clear the form after submission
    setInputs({});
    
    // Switch to the AdopterData view
    toggleView();
  } 

  const inputStyle = {}
  const labelStyle = {width:'fit-content',fontWeight: 'bold',opacity:'1'}
  return (
    <div style={{display:'flex',justifyContent:'center',alignContent:'center', height:'content',margin:'20px'}}>
      <form action="#" style={{display:'flex',flexDirection:'column', alignContent:'start',width:'35%',backgroundColor:'#B17F59',padding:'30px',opacity:'0.8'}} onSubmit={handleSubmit}>
        <label htmlFor="petName" style={labelStyle}>Pet Name</label>
          <input type="text" placeholder='Pet Name' name='petName' value={inputs.petName || ""} onChange={handleChange} style={{}}/>
        <label htmlFor="petType" style={labelStyle}>Pet Type</label>
        <select name="petType" id="petType" onChange={handleChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </select>
        <label htmlFor="breed" style={labelStyle}>Breed</label>
        <input type="text"  placeholder='Breed' name='breed' value={inputs.breed || ""} onChange={handleChange} style={inputStyle}/>
        <label htmlFor="yourName" style={labelStyle}>Your Name</label>
        <input type="text"  placeholder='Your Name' name='name' value={inputs.name || ""} onChange={handleChange} style={inputStyle}/>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input type="text"  placeholder='example@gmail.com' name='email' value={inputs.email || ""} onChange={handleChange} style={inputStyle}/>
        <label htmlFor="phone" style={labelStyle}>Phone</label>
        <input type="text"  placeholder='Phone' name='phone' value={inputs.phone || ""} onChange={handleChange}  style={inputStyle}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PetAdoptionForm