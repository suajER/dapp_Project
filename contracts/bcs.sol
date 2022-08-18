// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract bcs {
    //for transaction
    mapping(address => uint256) public donors;
    address public beneficiary;
    string public url;
    uint256 public minimumContribution;
    uint256 public target;
    uint256 public raisedAmount;
    uint256 public noOfdonors;
    uint256 public numRequests;
    uint256 public numofregisteredTender;

    struct Request {
        string description;
        uint256 value;
        bool completed;
        uint256 noOfVoters;
        address payable recipient;
        mapping(address => bool) voters;
    }

    mapping(uint256 => Request) public requests;

    function registerTender(
        uint256 _target,
        uint256 _minimum,
        string memory _url
    ) external payable {
        require(numofregisteredTender == 0, "only one tender");
        target = _target;
        minimumContribution = _minimum;
        url = _url;
        beneficiary = msg.sender;
        numofregisteredTender++;
    }

    function getreqNo() public view returns (uint) {
        return numRequests;
    }
    function donate() public payable {
        require(msg.value <= target, "amount greater than target");
        require(numRequests == 0, "raised amount has already mey target");

        require(
            msg.value >= minimumContribution,
            "Minimum donation is not met"
        );
        if (donors[msg.sender] == 0) {
            noOfdonors++;
        }
        donors[msg.sender] = msg.value + donors[msg.sender];
        raisedAmount += msg.value;
    }

    modifier onlybeneficiary() {
        require(
            msg.sender == beneficiary,
            "Only beneficiary can calll this function"
        );
        _;
    }

    modifier onlydonor() {
        require(donors[msg.sender] > 0, "Only donors can calll this function");
        _;
    }

    function createRequests(
        string memory _description,
        address payable _recipient,
        uint256 _value
    ) public payable onlybeneficiary {
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;
    }

    function voteRequest(uint256 _requestNo) public onlydonor {
        require(donors[msg.sender] > 0, "YOu must be contributor");
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.voters[msg.sender] == false,
            "You have already voted"
        );
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }

    function settleRequest(uint256 _requestNo) public onlybeneficiary {
        require(raisedAmount <= target);
        Request storage thisRequest = requests[_requestNo];
        require(
            thisRequest.completed == false,
            "The request has been completed"
        );
        require(
            thisRequest.noOfVoters > noOfdonors / 2,
            "Majority does not support"
        );
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed = true;
    }

    function getTenderinfo()
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            uint256,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            minimumContribution,
            target,
            url,
            address(this).balance,
            beneficiary,
            noOfdonors,
            numRequests,
            raisedAmount
        );
    }

    function getRequeststatus(uint256 _i)
        public
        view
        returns (
            bool,
            uint256,
            address,
            uint256,
            uint256,
            string memory,
            address
        )
    {
        return (
             requests[_i].completed,
            requests[_i].value,
            requests[_i].recipient,
            requests[_i].noOfVoters,
            noOfdonors,
            requests[_i].description,
            beneficiary
        
        );
    }
}
