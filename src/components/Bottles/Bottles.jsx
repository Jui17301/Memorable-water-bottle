import { useEffect } from "react"
import { useState } from "react"
import Bottle from "../Bottle/Bottle"
import './Bottles.css'
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localStorage"
import Cart from "../Cart/Cart"

const Bottles = () => {
  const[bottles,setBottles] =useState([])
  const[cart,setCart]=useState([])
  useEffect(() => {
    fetch("bottles.json")
    .then(res=>res.json())
    .then(data=>setBottles(data))
  }, [])

  //load cart from local storage
  useEffect(() => {
    if(bottles.length>0){
      const storedCart = getStoredCart();
      const savedCart =[];
      for(const id of storedCart )
      {
        console.log(id);
        const bottle = bottles.find((bottle)=>bottle.id===id)
        if(bottle){
             savedCart.push(bottle)
        }
      }
      setCart(savedCart);
    }
  

  }, [bottles])
  

  const handleAddToCart=(bottle)=>{
    console.log('bottle going to be added')
    const newCart =[...cart,bottle];
    setCart(newCart);
    addToLS(bottle.id)
  }
  const handleRemoveFromCart=id=>{
// visual cart remove
const remainingCart = cart.filter(bottle=> bottle.id!== id)
setCart(remainingCart);
//remove from LS
removeFromLS(id);
  }
  return (
    <div className="main-container">
      <h2>Bottles Available:{bottles.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      {/* <h4>Cart:{cart.length}</h4> */}
      <div className="bottles">
      {
        bottles.map((bottle)=> <Bottle 
        handleAddToCart={handleAddToCart} 
        bottle={bottle} 
        key={bottle.id}
        ></Bottle>)
      }
    </div>
    </div>
  )
}

export default Bottles
