import './App.css'
import Sidebar from './Components/Sidebar.jsx'
import HeroContent from './Components/HeroContent.jsx'
function App() {
  return (
    <div className='bg-[#1a1a1a] flex'>
      <Sidebar></Sidebar>
      <HeroContent></HeroContent>
    </div>
  )
}

export default App
