// SPDX-License-Identifier: GPL-3.0
pragma solidity = 0.8.26;
contract MySmart {
    uint256 number;
    address  payable owner;
    address  payable add1=payable(0xe9F484F0669C3D467b026Da1f5562B01EeD8dC53);
    address  payable add2=payable(0x8189C2f5F44E1863079fE22180a2917d1f5cE504);
    
    
    
    uint immutable  rat1=20;
    uint immutable  rat2=80;
    
    
    
    constructor(){
    owner=payable (msg.sender);
  }
receive() external payable {
    add1.transfer(msg.value*20/100);
    add2.transfer(msg.value*80/100);
    
    
    
}
}