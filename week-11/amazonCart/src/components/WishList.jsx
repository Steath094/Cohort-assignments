import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/wishlist.styles.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { wishlistItemAtom } from '../store/wishItemsState'
import { cartItemsAtom } from '../store/cartItemsState'
function WishList() {
    const wishlistItem = useRecoilValue(wishlistItemAtom)
    const setCartItemList = useSetRecoilState(cartItemsAtom)
    console.log(wishlistItem);
    const [isGrid, setIsGrid] = useState(false)

    const addingCart = (item)=>{
        console.log(item);
        
        setCartItemList((prevCart) => {
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
            if (existingItemIndex !== -1) {
              // Item exists, increase quantity
              return prevCart.map((cartItem, index) =>
                index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
              );
            } else {
              // Item doesn't exist, add it to cart with quantity 1
              return [...prevCart, { ...item }];
            }
          });
    }
  return (
    <div className='wishlistMain'>
        <div className='wishlistLeft'>
            <div className='leftSideBarContent'>
                <p className='heading'>Your Wish List</p>
                <p>Default List</p>
            </div>
        </div>
        <div className='wishlistRight'> 
            <div className='wishlistRightHead'>
                <div className='wishlistRightHeading'>
                    <div className='wishlistRightHeadingLeft'>
                        <p className='heading'>Your Wish List</p>
                        <p>Public</p>
                    </div>
                    <div className='wishlistRightHeadingRight'>
                        <button className='noStyleButton shareButton'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="blue"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg> Send List to others</button>
                        <button className='noStyleButton'><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg></button>
                    </div>
                </div>
                <div className='wishlistRightHeadButtons'>
                    <div className='headButtonLeft'>
                        <button className='noStyleButton' style={{backgroundColor: isGrid?'#fff7ed':'#ffffff',padding:'6px',borderRadius:'8px'}} onClick={()=>{setIsGrid(true)}}><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z"/></svg></button>
                        <button className='noStyleButton' style={{backgroundColor: isGrid?'#ffffff':'#fff7ed',padding:'6px',borderRadius:'8px'}} onClick={()=>{setIsGrid(false)}}><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg></button>
                    </div>
                    <div className='headButtonRight'>
                        <input className='searchWishlist' type="search" name="searchWishlist" id="searchWishList" placeholder=' Search this list' />
                        <select name="filter" id="filter">
                            <option value="Name">Name</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='wishlistRightContent'>
                
                {isGrid ? <div className='wishlistContentGrid'>
                    {wishlistItem.map(item=>(
                    <div key={item.id} className='gridItem'>
                    <div className="gridItemImg">
                        <img src={item.image} alt={item.name+'Image'} />
                    </div>
                    <div className='gridItemDetail'>
                        <p className='heading'>{item.name}</p>
                        <p className='itemPrice'><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{item.price}</p>
                        <button className='gridItemButton'>Add to Cart</button>
                    </div>
                </div>
                    ))}
                </div>:
                <div className='nonGrid'>
                    {wishlistItem.map(item=>(
                        <div key={item.id} className='nonGridItem'>
                        <div className='nonGridItemImage'>
                            <img src={item.image} alt={item.name+'Image'} />
                        </div>
                        <p className='heading nonGridItemTitle'>{item.name}</p>
                        <p className='itemPrice'><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{item.price}</p>
    
                        <button className='nonGridItemButton' onClick={()=>{addingCart(item)}}>Add to cart</button>
                    </div>
                    ))}
                </div>
                    }
                
            </div>
        </div>
    </div>
  )
}

export default WishList