import React, { useState } from 'react'
import '../styles/amazoncart.styles.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cartItemsAtom } from '../store/cartItemsState'
import { cartTotalSelector } from '../store/cartTotalSelector'
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle } from "lucide-react";
function AmazonCart() {
  const [cartList,setCartList] = useRecoilState(cartItemsAtom)
  const cartTotal = useRecoilValue(cartTotalSelector) 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const increase = (id) => {
    console.log(id);
    
    setCartList((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of an item (Remove if quantity is 1)
  const decrease = (id) => {
    setCartList((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity reaches 0
    );
  };
  const remove = (id) =>{
    console.log(id);
    
    setCartList(prevCart=>(
      prevCart.filter(item=>item.id!=id)
    ))
  }
  return (
    <div className='cart'>
        <div className='cartLeft'>
            <p className='cardHeading'>Shopping Cart</p>
            <div className='cartItemList'>
              {cartList.length==0?<div style={{fontSize:'2rem',padding:'20px 0px'}}>Your Cart is Empty</div>:
              cartList.map(item=>(
                <div key={item.id} className='cartItem'>
                <div className="cartItemImage">
                  <img src={item.image} alt={item.name+'Image'} />
                </div>
                <div className="cartItemDetail">
                  <p className='cartItemHeading'>{item.name}</p>
                  <p >In stock</p>
                  <div className='cartItemDetailOPtions'>
                    <button className='cartItemDetailOPtionsButton' onClick={()=>{decrease(item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg></button>
                    <p style={{fontSize:'1.2rem'}}>{item.quantity}</p>
                    <button className='cartItemDetailOPtionsButton' onClick={()=>{increase(item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                    <button className='noStyleButton deleteButton' onClick={()=>{remove(item.id)}}>Delete</button>
                  </div>
                </div>
                <div className="cartItemPrice">
                  <p className='price'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{item.price}</p>
                </div>
              </div>
              ))}
            </div>
        </div>
        <div className='cartRight'>
            <p className='summaryHeading'>Order Summary</p>
            <div className="orderDetails">
              <div className="itemCount">
                <p>Items ({cartTotal.itemCount}):</p><p><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{cartTotal.total}</p>
              </div>
              <div className="itemTotal">
              <p>Order Total:</p><p><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{cartTotal.total}</p>

              </div>
              <button className='checkoutButton' onClick={()=>{setIsModalOpen(true)}}>Proceed To Buy</button>
              <PurchaseSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                totalAmount={cartTotal.total}
              />
            </div>
        </div>
    </div>
  )
}
const PurchaseSuccessModal = ({ isOpen, onClose, totalAmount }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Purchase Successful!</h2>
        <span className="checkmark">✔</span>
        <p>Thank you for your purchase. Your order has been successfully processed.</p>
        <p className="total-amount">Total Amount: <strong>₹{totalAmount}</strong></p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default AmazonCart