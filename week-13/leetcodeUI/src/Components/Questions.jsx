import React, { useState } from 'react'

function Questions() {
    const problems = [
        { id: 14, title: "Longest Common Prefix", difficulty: "Easy" },
        { id: 217, title: "Contains Duplicate", difficulty: "Easy" },
        { id: 125, title: "Valid Palindrome", difficulty: "Easy" },
        { id: 26, title: "Remove Duplicates from Sorted Array", difficulty: "Easy" },
        { id: 66, title: "Plus One", difficulty: "Easy" },
        { id: 136, title: "Single Number", difficulty: "Easy" },
        { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
        { id: 88, title: "Merge Sorted Array", difficulty: "Easy" },
        { id: 69, title: "Sqrt(x)", difficulty: "Easy" },
        { id: 206, title: "Reverse Linked List", difficulty: "Easy" },
        { id: 141, title: "Linked List Cycle", difficulty: "Easy" },
      ];
      
      const difficultyColor = {
        Easy: "text-cyan-400",
      };
      const [filterModal, setFilterModal] = useState(false)
  return (
    <div className='xl:w-5/8 flex flex-col gap-4 w-full relative'>
        <div>
            <button onClick={()=>setFilterModal((prev)=>!prev)} className='flex bg-white justify-center items-center py-1 px-4 rounded-2xl hover:bg-amber-50'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z"/></svg>Filter</button>
        </div>
        {filterModal && <FilterPanel/> }
        <div className=" w-full text-white">
      <div className=" mx-auto space-y-2">
        {problems.map((problem,index) => (
          <div
            key={problem.id}
            className={` flex justify-between items-center rounded-md px-4 py-3 ${index%2==0?"bg-[#282828]":"bg-[##1a1a1a]"}`}
          >
            <span className="text-sm md:text-base">
              {problem.id}. {problem.title}
            </span>
            <span className={`text-sm font-medium ${difficultyColor[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Questions

function FilterPanel() {
    const [status, setStatus] = useState({
      todo: false,
      solved: false,
      attempted: false,
    })
  
    const [difficulty, setDifficulty] = useState({
      easy: true,
      medium: false,
      hard: false,
    })
  
    const [showTags, setShowTags] = useState(false)
  
    const resetFilters = () => {
      setStatus({ todo: false, solved: false, attempted: false })
      setDifficulty({ easy: false, medium: false, hard: false })
      setShowTags(false)
    }
  
    return (
      <div className="bg-[#2d2d2d] rounded-xl text-white w-fit space-y-4 p-6 absolute lg:top-10 sm:top-">
        <div>
          <p className="font-semibold mb-2">Status</p>
          <div className="flex gap-4">
            {['todo', 'solved', 'attempted'].map((key) => (
              <label key={key} className="flex items-center gap-1 capitalize">
                <input
                  type="checkbox"
                  checked={status[key]}
                  onChange={() => setStatus({ ...status, [key]: !status[key] })}
                  className="accent-white"
                />
                {key}
              </label>
            ))}
          </div>
        </div>
  
        <div>
          <p className="font-semibold mb-2">Difficulty</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-1 text-cyan-400">
              <input
                type="checkbox"
                checked={difficulty.easy}
                onChange={() =>
                  setDifficulty({ ...difficulty, easy: !difficulty.easy })
                }
                className="accent-cyan-400"
              />
              Easy
            </label>
            <label className="flex items-center gap-1 text-yellow-400">
              <input
                type="checkbox"
                checked={difficulty.medium}
                onChange={() =>
                  setDifficulty({ ...difficulty, medium: !difficulty.medium })
                }
                className="accent-yellow-400"
              />
              Medium
            </label>
            <label className="flex items-center gap-1 text-red-400">
              <input
                type="checkbox"
                checked={difficulty.hard}
                onChange={() =>
                  setDifficulty({ ...difficulty, hard: !difficulty.hard })
                }
                className="accent-red-400"
              />
              Hard
            </label>
          </div>
        </div>
  
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTags}
              onChange={() => setShowTags(!showTags)}
              className="accent-white"
            />
            Show tags
          </label>
        </div>
  
        <div>
          <button
            onClick={resetFilters}
            className="w-full bg-[#3a3a3a] hover:bg-[#444444] text-white rounded-md py-2 flex items-center justify-center gap-2"
          >
            <span>🔄</span> Reset
          </button>
        </div>
      </div>
    )
  }
  