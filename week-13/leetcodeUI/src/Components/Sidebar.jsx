import React, { useState } from 'react'

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  return isModalOpen ? 
    <div className='lg:flex p-5 bg-[#333333] w-1/6 flex-col text-white gap-2.5 hidden'>
        <div className='flex justify-between px-2'>
            <p className='text-lg font-semibold font-sans' >My Lists</p>
            <span onClick={() => setIsModalOpen(false)} className="cursor-pointer hover:bg-[#383838] p-2 rounded-lg" ><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm540-453h100v-107H700v107Zm0 186h100v-106H700v106ZM160-240h460v-480H160v480Zm540 0h100v-107H700v107Z"/></svg></span>
        </div>
        <div className='flex px-2'>
            <p className='font-semibold font-sans'>Created by me</p>
        </div>
        <div className='flex justify-between hover:bg-[#434343] py-3 px-2 rounded-md'>
            <div className='flex gap-2'>
            <div className='h-6 w-6 bg-white rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg></div>
            <p className='font-sans'>Favorite</p>
            </div>
            <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg></div>
        </div>
    </div>
  
  : (
    <div className='w-[50px] flex justify-center py-10'>
      <span onClick={() => setIsModalOpen(true)} className="cursor-pointer hover:bg-[#383838] p-2 rounded-lg w-fit h-fit" ><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm540-453h100v-107H700v107Zm0 186h100v-106H700v106ZM160-240h460v-480H160v480Zm540 0h100v-107H700v107Z"/></svg></span>
    </div>
  )
}

export default Sidebar