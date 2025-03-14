import { useEffect, useState } from 'react';
import Header from './components/Header';
import PetAdoptionForm from './components/PetAdoptionForm';
import AdopterData from './components/AdopterData'
import "./myApp.css";


const App = () => {
  const [formView, setFormView] = useState(true)
  const [data,setData] = useState([])
  // function handleChange(newValue) {
  //   setData(prev=>[...prev,newValue]);
  // }
  

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')",
        height: "100dvh",
        backgroundSize: "cover"
      }}
    >
      <Header message={"Pet Adoption Form"} toggleView={()=>setFormView(!formView)} formView={formView}/>
      {formView?<PetAdoptionForm handleDataChange={(newValue)=>setData(prev=>[...prev,newValue])} toggleView={()=>setFormView(!formView)}/>:<AdopterData data={data} toggleView={()=>setFormView(!formView)}/>}
    </div>
  );
};
export default App;
