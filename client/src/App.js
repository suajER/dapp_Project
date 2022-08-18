import React, { Component } from "react";
import bcs from "./contracts/bcs.json";
import verifyAccounts from './contracts/'
import getWeb3 from "./getWeb3";
import Formate from './utils/Formate';
import 'semantic-ui-css/semantic.min.css'
import { Menu } from "semantic-ui-react";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
import SignOut from "./components/SignOut";
import Dashboard from "./components/Dashboard";
import "./App.css";


class App extends Component {
  state = { web3: null,
     account: null,
     contract: null,
    balance: null,
    activeItem: 'home',
    signedUp: false,
    loggedIn: false,
    username: ''
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'red' })
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
        deployedNetwork && deployedNetwork.address,
      );
      


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account:accounts[0], contract: contractA},this.start);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };
  start = async () => {
   
    const { web3,account,contract } = this.state;
    
    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
  };


 getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on('accountsChanged', async (accounts) => {
        this.setState({
          account: accounts[0],
          loggedIn: false
        });

        this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            this.setState({ balance: Formate(this.state.web3.utils.fromWei(balance, 'ether')) });
          }
        });
      });
    }
  }

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  }

  userSignedIn = async (loggedIn, username) => {
    this.setState({ loggedIn, username });
  }

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  }


  render() {
    const { activeItem, color } = this.state;
    if (!this.state.web3) {
      return <div>Users are requested to get connected to METAMASK before using this dAPP</div>;
    }
    return (
      <div className="App">
      <div className="main-page">
        <BrowserRouter>
          <div className="home-nav">
            <Menu stackable inverted secondary size='large'>
              <Menu.Item
                name='home'
                position='right'
                color={color}
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                as={Link}
                to='/'
              />
             
            
              {
                !this.state.loggedIn ?
                  <Menu.Item
                    position='right'
                    name='sign in'
                    color={color}
                    active={activeItem === 'sign in'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-in'
                  />
                  :
                  console.log('')
              }

              {
                this.state.loggedIn ?
                  <Menu.Item
                    name='sign out'
                    color='red'
                    active={activeItem === 'sign out'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-out'
                  />
                  :
                  <Menu.Item
                    name='sign up'
                    color={color}
                    active={activeItem === 'sign up'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/sign-up'
                  />
              }
            </Menu>
          </div>


          <Switch>
            <Route exact path='/' >
              <Home />
            </Route>
            
            {
              <Route path='/sign-in' >
                {
                  this.state.loggedIn ?
                    <Redirect to='/dashboard' />
                    :
                    <SignIn
                      web3={this.state.web3}
                      contract={this.state.contract}
                      account={this.state.account}
                      signedUp={this.state.signedUp}
                      userSignedIn={this.userSignedIn}
                    />
            
                }
              </Route>
            }
            

            {
                this.state.loggedIn ?
                  <Route path='/dashboard' >
                  <Dashboard 
                  
                  />
                  </Route>
                  :
                  <Route path='/sign-out'>
                    You have been logged out
                  </Route>
              }

            {
              this.state.loggedIn ?
                <Route path='/sign-out'>
                  <SignOut
                    loggedOut={this.loggedOut}
                  />
                  You've been logged out
                  <br></br>
                  Thank you
                </Route>
                :
                <Route path='/sign-up' >
                  <SignUp
                    web3={this.state.web3}
                    contract={this.state.contract}
                    account={this.state.account}
                    accountCreated={this.accountCreated}
                  />
                </Route>
            }
          </Switch>
        </BrowserRouter>
      </div>
    </div>
     
    );
  }
}

export default App;
