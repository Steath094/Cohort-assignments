import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const userId = useSelector((state)=>state.auth.userId);

    const toggleDropDown = () => setDropDownOpen(!dropDownOpen)
    const openProfileModal = () => {
        setDropdownOpen(false); // Close dropdown when profile is clicked
        setModalOpen(true); // Open profile modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Join Now",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Courses",
            slug: "/allCourses",
            active: authStatus,
        },
        {
            name: "Purchased Courses",
            slug: "/purchasedCourses",
            active: authStatus,
        },
    ]
  return (
    <header className=''>
      <div className='container mx-auto px-4'>
        <nav className='fixed top-0 z-[999] w-full border-b border-primary/10 bg-gray-950'>
        <div className='wrapper flex w-full items-center justify-between p-3 px-28  '>
          <div className='flex items-center gap-4'>
            <Link className='flex items-center gap-2' to="/">
              <Logo/>
              <h1 className='hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[410px]:block'>Coursifiy</h1>
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <button className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground dark:text-neutral-950 h-10 w-10 group rounded-lg border-none bg-transparent shadow-none hover:bg-blue-600/5'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon absolute size-6 rotate-90 scale-0 transition-all group-hover:text-blue-500 dark:rotate-0 dark:scale-100 dark:text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun size-6 rotate-0 scale-100 text-black transition-all group-hover:text-blue-500 dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              <span className="sr-only">Toggle theme</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu size-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
            </button>

            <div className="hidden items-center gap-2 md:flex">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground dark:text-neutral-950 hover:bg-primary/90 h-10 px-4 py-2 bg-white hover:opacity-90">
                <Link to="/login">Login</Link>
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-blue-400 to-blue-700 text-white font-medium hover:opacity-80 transition-all duration-300 h-10 px-4 py-2">
              <Link to="/signup">Join now</Link>
              </button>
            </div>
          </div>    
        </div>
        </nav>
      </div>
        
    </header>
  )
}

export default Header