import React from 'react'

const Header = ({toggleView,formView}) => {

  // console.log(formView);
  
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'12px',padding: 20,backgroundColor:'#B17F59',opacity:'0.7',color:'#193b24'}}>
      <div style={{fontSize:'1.5rem',fontWeight:'bold',textAlign:'center',width:'70%'}}>
      Pet Adoption Form
        </div>
      <button onClick={toggleView} style={{width:'fit-content',margin:'0px'}}>View {formView ? "List" : "Form"}</button>
    </div>
  )
}

export default Header