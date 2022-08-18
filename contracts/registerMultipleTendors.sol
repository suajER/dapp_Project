// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "./bcs.sol";
contract registerMultipleTendors {
    
  
    address contractaddress;
    function setContractaddress(address _contractADDRESS) public {
        contractaddress=_contractADDRESS;
    }

    function createTender(uint _target,uint _minimum,string memory _fileurl) public {
        bcs contractPointer = bcs(contractaddress);
        contractPointer.registerTender(_target,_minimum,_fileurl);
    }

    function getDeployedTender() public view returns (address) {
        return (contractaddress);
    }
}


//just calling registerTender() of smart contract bcs to create multiple tendors
/* to do so,
   1)we created contractpointer which points to bcs through contract address after (bcs) deployment in blockchain
   2)then accessed registerTender() and passed neccessaary arguments to register tendor

   AS a whole, multiple contract address access means registering multiple tendors  */


/* POINT TO BE NOTED
   1) deploy contract bcs(responsible charity handling and transaction) firstly
   2) deploy this contract after bcs's deployment

*/
    