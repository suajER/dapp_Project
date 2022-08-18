import React,{ useState,useEffect,useLayoutEffect} from 'react'
import TransactionRow from './TransactionRow';
import '../App.css' 

const ShowRequest=(props)=> {
  const[current,setCurrent]=useState(0) //dummy state

  const initialInfo=async()=>{

  let f=await props.contract.methods.getreqNo().call()
  const info = await Promise.all(
    Array(parseInt(f)).fill().map((element, index) => {
        return props.contract.methods.getRequeststatus(index).call();
      })
  )
   localStorage.setItem("info",JSON.stringify(info))



    }


    useEffect(()=>{

      initialInfo();
      handler();
      console.log("use effect used as layouteffect")
      
    },[])

  useEffect(()=>{


    console.log("inside useeffect")
    initialInfo();
    handler();
    console.log("useeffect used foe update")
    
  },[props.refresh])
  

const handler=()=>{
  setTimeout(()=>{
    setCurrent(!current)
  },1000)
}



  return (
    <div>

      {console.log("render")}
      {console.log(current)}
      <h2>Request Table:</h2>
  <TransactionRow
         account={props.account}
         contract={props.contract}
         web3={props.web3}
         />  

        
 </div> 
  )
}
export default ShowRequest