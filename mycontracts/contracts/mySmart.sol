// SPDX-License-Identifier: GPL-3.0
pragma solidity = 0.8.26;
contract MySmart {
    uint256 number;
    address  payable owner;
    address  payable add1=payable(0xBC31505a1C9711e070Af7AdF9078908B77475112);
    address  payable add2=payable(0xC5a9657326F0AF7d0e5a985344bf29d85f17CB8f);
    
    
    
    uint immutable  rat1=40;
    uint immutable  rat2=60;
    
    
    
    constructor(){
    owner=payable (msg.sender);
  }
receive() external payable {
    add1.transfer(msg.value*40/100);
    add2.transfer(msg.value*60/100);
    
    
    
}
}