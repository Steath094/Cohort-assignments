import React, { useState,useEffect } from 'react'
import { validation } from '../utils/validation';
const PetAdoptionForm = ({handleDataChange,toggleView}) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({
          petName: "",
          petType: "",
          breed: "",
          adopterName: "",
          email: "",
          phone: ""
      });
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    
    setInputs(values => ({...values, [name]: value}))

    let errorsCopy = { ...errors };
    const errorR = validation(name, value, errorsCopy);
    console.log(errorR);
    
    setErrors(errorR);
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((val) => val);
        if (hasErrors) {
            alert("Please fill out all fields");
            return;
        }
    
    handleDataChange(inputs);
    setInputs({});
    setErrors({
      petName: "",
      petType: "",
      breed: "",
      adopterName: "",
      email: "",
      phone: ""
  })
    toggleView();
  } 

  const inputStyle = {}
  const labelStyle = {width:'fit-content',fontWeight: 'bold',opacity:'1'}
  return (
    <div style={{display:'flex',justifyContent:'center',alignContent:'center', height:'content',margin:'20px'}}>
      <form action="#" style={{display:'flex',flexDirection:'column', alignContent:'start',width:'35%',backgroundColor:'#B17F59',padding:'30px',opacity:'0.8'}} onSubmit={handleSubmit}>
        <label htmlFor="petName" style={labelStyle}>Pet Name</label>
          <input type="text" placeholder='Pet Name' name='petName' id='petName' value={inputs.petName || ""} onChange={handleChange} style={{}}/>
          <small>{errors.petName}</small>
        <label htmlFor="petType" style={labelStyle}>Pet Type</label>
        <select name="petType" id="petType" onChange={handleChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </select>
        <label htmlFor="breed" style={labelStyle}>Breed</label>
        <input type="text"  placeholder='Breed' name='breed' id='breed' value={inputs.breed || ""} onChange={handleChange} style={inputStyle}/>
        <small>{errors.breed}</small>
        <label htmlFor="name" style={labelStyle}>Your Name</label>
        <input type="text"  placeholder='Your Name' name='name' id='name' value={inputs.name || ""} onChange={handleChange} style={inputStyle}/>
        <small>{errors.adopterName}</small>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input type="text"  placeholder='example@gmail.com' name='email' id='email' value={inputs.email || ""} onChange={handleChange} style={inputStyle}/>
        <small>{errors.email}</small>
        <label htmlFor="phone" style={labelStyle}>Phone</label>
        <input type="text"  placeholder='Phone' name='phone' id='phone' value={inputs.phone || ""} onChange={handleChange}  style={inputStyle}/>
        <small>{errors.phone}</small>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PetAdoptionForm