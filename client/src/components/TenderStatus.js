import React, { Component } from 'react'
import {Segment,  Card} from 'semantic-ui-react';
import '../App.css'
 class TenderStatus extends Component {
  constructor(props) {
    super(props);
    this.state={
      target: null,
      minimumcontribution: null,
      url: null,
      beneficiary: null,
      balance : null,
      donors : null,
      requests : null,
      raisedAmount:null,
      donateValue:null
  
  }

}
weiTOeth=(amount)=>{
  const ConvertedAmount=this.props.web3.utils.fromWei(amount);
  return ConvertedAmount;
  }

  componentDidMount=async()=>{
    
    const info = await this.props.contract.methods.getTenderinfo().call();
    this.setState(
      {minimumcontribution : this.weiTOeth(info[0]),
        target : this.weiTOeth(info[1]),
        url : info[2], 
        balance : this.weiTOeth(info[3]), 
        beneficiary: info[4],donors:info[5],requests : info[6],
        raisedAmount :  this.weiTOeth(info[7]) 
      });
    console.log("componentDidMount")
  }

  componentDidUpdate = async(prevProps,prevState) =>{
    if(prevState.raiseAmount === this.props.raiseAmount && prevProps.refresh!==this.props.refresh){
    const info = await this.props.contract.methods.getTenderinfo().call();
    this.setState(
      {minimumcontribution : this.weiTOeth(info[0]),
        target : this.weiTOeth(info[1]),
        url : info[2], 
        balance : this.weiTOeth(info[3]), 
        beneficiary: info[4],donors:info[5],requests : info[6],
        raisedAmount :  this.weiTOeth(info[7]) 
      });
    }
    
    console.log("ComponentDidUpdate")
    
  }

  

  render() {
    return (
      
       
      <div className='ui container center'>
      {console.log("render")}
       <h1>Tender Status:</h1>
  
       <Card.Group>
       <Card>
         <Card.Content>
           <Card.Header>{this.state.beneficiary}</Card.Header>
           <Card.Meta>Address of the creator</Card.Meta>
           <Card.Description>
             This address can create request for collected amount
           </Card.Description>
         </Card.Content>
       </Card>
       <Card
         header={this.state.url}
         meta='Link of the protocol'
         description='This is the uploaded protocol from this tender.Copy URL and review it.'
       />
       <Card>
         <Card.Content>
           <Card.Header>{this.state.target} ETH</Card.Header>
           <Card.Meta content='Target Amount' />
           <Card.Description content='This is the amount targeted for this tender.' />
         </Card.Content>
       </Card>
   
       <Card>
         <Card.Content>
           <Card.Header>{this.state.minimumcontribution} ETH</Card.Header>
           <Card.Meta content='Minimum Amount' />
           <Card.Description content='This is minimum amount specified by the tender to contribute.' />
         </Card.Content>
       </Card>
       <Card>
         <Card.Content>
           <Card.Header>{this.state.raisedAmount} ETH</Card.Header>
           <Card.Meta content='Raised Amount' />
           <Card.Description content='This is the collected amount in this tender.' />
         </Card.Content>
       </Card>
 
   
        <Card
         header={this.state.donors}
         meta='Number Of Donors'
         description='This shows the number of people who donated in this tender.'
       />
 
       <Card
         header={this.state.requests}
         meta='Number Of Requests'
         description="This shows the number of requests created by the creator after he/she wished to stop funding.You won't be able to donate after creator makes request."
       />
     </Card.Group>
    
       <Segment horizontal>Tender Current Balance: {this.state.balance} ETH</Segment>

        </div>
    )
  }
}
export default TenderStatus
