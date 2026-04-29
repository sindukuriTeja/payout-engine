// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayoutRegistry {
    struct Payout {
        address sender;
        address receiver;
        uint256 amount;
        uint256 tax;
        uint256 timestamp;
    }

    Payout[] public payouts;
    mapping(address => uint256[]) public userPayouts;

    event PayoutRecorded(address indexed sender, address indexed receiver, uint256 amount, uint256 tax, uint256 timestamp);

    function recordPayout(address _sender, address _receiver, uint256 _amount, uint256 _tax) public {
        Payout memory newPayout = Payout({
            sender: _sender,
            receiver: _receiver,
            amount: _amount,
            tax: _tax,
            timestamp: block.timestamp
        });

        payouts.push(newPayout);
        uint256 payoutId = payouts.length - 1;
        
        userPayouts[_sender].push(payoutId);
        userPayouts[_receiver].push(payoutId);

        emit PayoutRecorded(_sender, _receiver, _amount, _tax, block.timestamp);
    }

    function getPayoutCount() public view returns (uint256) {
        return payouts.length;
    }

    function getPayoutsByUser(address _user) public view returns (Payout[] memory) {
        uint256[] memory indices = userPayouts[_user];
        Payout[] memory result = new Payout[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = payouts[indices[i]];
        }
        return result;
    }
}
