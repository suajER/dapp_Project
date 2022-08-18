import React, { Component } from 'react';
import { BrowserRouter as Router,NavLink,Switch,Route } from 'react-router-dom';
import Guideline from '../dashComponents/Guideline';
import Tender from '../dashComponents/Tender';
import '../dashComponents/sidebar.css';
import aboutUS from '../dashComponents/aboutUS';
import RequestLog from '../dashComponents/RequestLog';
import getWeb3 from '../getWeb3';
import bcs from '../contracts/bcs.json'
import TenderLogs from '../dashComponents/TenderLogs';


let array=new Array(1).fill().map(()=>new Array(7).fill('0')) //this is dummy array of objects used for local storage 
localStorage.setItem("info",JSON.stringify(array))
 class Dashboard extends Component {
   state={account:null,sidebar:true,contract: null,caddress : null,web3:null}

 
   componentDidMount = async () => {
     try {
       // Get network provider and web3 instance.
       const web3 = await getWeb3();
 
       // Use web3 to get the user's accounts.
       const accounts = await web3.eth.getAccounts();
 
    
   // Get the BCS contract instance.
    const networkId = await web3.eth.net.getId();
     const deployedNetwork = bcs.networks[networkId];
     const contractA = new web3.eth.Contract(
      bcs.abi,
     deployedNetwork && deployedNetwork.address,);
     const address = deployedNetwork.address;

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account:accounts, contract: contractA,caddress : address},this.start);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };
  start = async () => {
   
    const { web3,account,contract,caddress } = this.state;
    
    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
    console.log("caddress=",caddress)
  };

       
 
    
  showSidebar = () => { 
     this.setState({sidebar: !(this.state.sidebar)});

  }
  render() {
  

    return( 
    <div>

    <Router>
    <nav className={this.state.sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={this.showSidebar}><div></div></button>
      <ul onClick={this.showSidebar}>
        <li>DASHBOARD</li>
        <li><NavLink activeClassName="text-white" to="/guideline" >User Guideline</NavLink></li>
        <li><NavLink to="/tender">Tender Creation</NavLink></li>
        <li><NavLink to="/tenderlog">Tender Logs</NavLink></li>
        <li><NavLink to="/request">Request Logs</NavLink></li>
        <li><NavLink to="/aboutus">About Us</NavLink></li>
      </ul>
    </nav>
    

    <Switch>
      
      <Route exact path="/guideline"  component={Guideline} />

      <Route path="/tender">
        <Tender
         web3={this.state.web3} 
        contract={this.state.contract}
         account={this.state.account}
          />
      </Route>
      

      <Route exact path="/tenderlog">
      <TenderLogs
         address={this.state.caddress}
         contract={this.state.contract}
         account={this.state.account}
         web3={this.state.web3} />
         
      </Route>

      <Route path="/request">
        <RequestLog
        
        address={this.state.caddress}
        contract={this.state.contract}
        account={this.state.account}
        web3={this.state.web3} />

      </Route>

      <Route path="/aboutus"  component={aboutUS} />
    

    </Switch>
    </Router>

  </div>
    );
  }
}
export default Dashboard