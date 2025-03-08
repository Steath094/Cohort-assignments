// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader.jsx";
import { Outlet } from "react-router-dom";
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    // authService.getCurrentUser()
    // .then((userData)=>{
    //   if (userData) {
    //     dispatch(login({userData}))
    //   }else{
    //     dispatch(logout())
    //   }
    // })
    // .finally(()=>{setLoading(false)})
  },[])
    
  return loading?(
    <div>
      <Header/>
      <Outlet/>
    <Footer/>
    </div>
  ): <Loader/>
}

export default App
