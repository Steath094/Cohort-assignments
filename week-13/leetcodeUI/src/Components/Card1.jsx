import React from 'react'

function Card1() {
  const total = 19;
  const solved = 19;
  const progress = (solved / total) * 100;

  const difficulties = [
    { label: "Easy", value: "11/11", color: "text-green-400" },
    { label: "Med.", value: "7/7", color: "text-yellow-400" },
    { label: "Hard", value: "1/1", color: "text-red-400" },
  ];

  return (
    <div className='bg-[#262626] xl:w-3/8 lg:p-6 text-white flex flex-col gap-4 rounded-xl h-fit w-full justify-center items-center p-4'>
         <div className='h-20 w-20 bg-white rounded-sm flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#F19E39"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg>
          </div>
          <h1 className='lg:text-4xl text-2xl'>Favorite</h1>
          <div className='flex lg:gap-0.5 text-sm'>
            <p>Steath</p><svg fill="#FFFFFF" viewBox="0 0 20 20" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g></svg>
          <p> 343 Questions </p> 
          <svg fill="#FFFFFF" viewBox="0 0 20 20" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g></svg>
          <div>Private </div>
         </div>
         <div className='flex gap-2' >
          <button className='flex p-2 pr-4 gap-1.5 bg-white text-black font-semibold rounded-4xl text-center '><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-200v-560l440 280-440 280Z"/></svg>Practice</button>
          <div className='flex justify-center items-center hover:bg-[#383838] rounded-full p-2'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"/></svg></div>
         </div>
         <div className='w-full bg-gray-700 h-[1.5px]'></div>
         <div>
         <div>
          <div className='sm:flex justify-between py-4 hidden '>
            <p className='font-semibold'>Progress</p>
            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></span>
          </div>
         </div>
         <div className='sm:grid grid-cols-3 gap-2 hidden'>
          <div className='col-span-2 bg-[#333333] rounded-lg items-center justify-center flex p-4'>
          <div className='relative w-40 h-40'>
          <svg className="w-full h-full rotate-[-90deg] ">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#2d3748"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className=" "><span className='text-3xl font-semibold'>{solved}</span>/{total}</div>
            <div className="text-green-400 mt-1">✔ Solved</div>
            <div className="text-sm text-gray-400 mt-1">0 Attempting</div>
          </div>
          </div>
          </div>
          
          <div className="flex flex-col gap-3 justify-center h-full">
          {difficulties.map((diff, i) => (
            <div
              key={i}
              className="flex flex-col justify-between items-center bg-[#333333] px-4 py-2 rounded-lg shadow"
            >
              <span className={`${diff.color} font-semibold`}>{diff.label}</span>
              <span className="text-white">{diff.value}</span>
            </div>
          ))}
        </div>
          </div>
         </div>
    </div>
  )
}

export default Card1