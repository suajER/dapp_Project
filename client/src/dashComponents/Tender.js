
import React, { useState } from 'react';
import { PdfUpload } from 'react-ipfs-uploader';
import swal from 'sweetalert';




 const Tender=(props) =>{
  const [pdfUrl, setPdfUrl] = useState('')
  const [target, setTarget] = useState('')
  const [min, setMin] = useState('')
  


  const submitHandler = async() => {
    alert('Are you sure to deploy your tender ?');
    const targetinWEI=props.web3.utils.toWei(target);
    const mininWEI=props.web3.utils.toWei(min);
    await props.contract.methods.registerTender(targetinWEI,mininWEI,pdfUrl).send({from:props.account[0]})
    swal({
      title: "Good job!",
      text: "successfuly created!",
      icon: "success",
      button: "Continue To Website",
    });
    setMin(" ")
    setTarget(" ")
  

  }
  return (
    <div className="ui container center">
      {console.log(props.contract)}
      <h2> Tender GENERATION</h2>
      <form className="ui form" type='submit'>
      
        <div className="field">
          <label>Target(ETH)</label>
          <input type="number" name="Target" placeholder="Target" onChange={(e) => setTarget(e.target.value)}></input>
        </div>
        <div className="field">
          <label>Minimum Contribution(ETH)</label>
          <input type="number" name="Minimum Contribution" placeholder="Minimum Contribution" onChange={(e) => setMin(e.target.value)}></input>
        </div>
      </form>
      <p>Upload Your Protocol Pdf</p>
      <PdfUpload setUrl={setPdfUrl} />
      <button className='ui button blue' onClick={submitHandler} >Create Tender</button>
      {console.log("account=",props.account)}

        
         </div>
  
  );
}
export default Tender
