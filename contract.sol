// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentReceiver {
    address public owner;
    
    event PaymentReceived(address indexed from, uint256 amount, string userId);

    constructor() {
        owner = msg.sender;
    }

    // Function to receive payments with a userId for tracking
    function pay(string memory userId) public payable {
        require(msg.value > 0, "Payment must be greater than 0");
        emit PaymentReceived(msg.sender, msg.value, userId);
    }

    // Withdraw funds (Owner only)
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
    
    // Fallback to receive ETH/BNB without data
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value, "unknown");
    }
}
