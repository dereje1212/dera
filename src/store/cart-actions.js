import { uiActions } from "../store/ui-slice.js";
import { cartActions } from "./cart-clice.js";

export const fetchData=()=>{
    return async(dispatch)=>{
      const fetchHandler= async()=>{
      const res = await fetch('https://shopping-c0a9b-default-rtdb.firebaseio.com/cartItems.json')
      const data = await res.json()
      return data;  
    
    }
    try{
      const cartData= await fetchHandler();
      dispatch(cartActions.replaceData(cartData))
    }catch(err){
        dispatch(uiActions.showNotification({
            open:true,
            message:'Sending Request failed',
            type:'error',
          }))
    }


    }
}

export const sendCartData = (cart)=>{
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
            open:true,
            message:'Sending Request',
            type:'warning'
          }))
          
const sendRequest = async()=>{
    //send state as sending request
    
  const res = await fetch(
    
    'https://shopping-c0a9b-default-rtdb.firebaseio.com//cartItems.json',{
    method:'PUT',
    body: JSON.stringify(cart),
  }
  
  );
  const data = await res.json();
  //send state as the request successful
  dispatch(uiActions.showNotification({
    open:true,
    message:'Sent the request to Database Successfully',
    type:'success'
    })
    )
  }
  try{
    await sendRequest();
  }catch(err){
    dispatch(uiActions.showNotification({
      open:true,
      message:'Sending Request failed',
      type:'error',
    }))
  }
    }
    
}