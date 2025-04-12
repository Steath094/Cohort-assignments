import React from 'react'
import Card1 from './Card1'
import Questions from './Questions';
function HeroContent() {
  return (
    <div className='bg-[#1a1a1a] flex-1 lg:py-10 lg:px-20 py-4 px-8'>
        <div className='flex gap-8 flex-col lg:flex-row'>
        <Card1></Card1>
        <Questions></Questions>
        </div>
    </div>
  )
}

export default HeroContent