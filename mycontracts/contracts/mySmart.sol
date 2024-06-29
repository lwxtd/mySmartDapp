// SPDX-License-Identifier: GPL-3.0
  pragma solidity = 0.8.26;
  contract MySmart {
      uint256 number;
      address  payable owner;
      address  payable add1=payable(0x8189C2f5F44E1863079fE22180a2917d1f5cE504);
      address  payable add1=payable(0x6A5C7F4E7cAa494857cDdb65509613C29eA7982a);
      
      
      
      uint immutable  rat1=20;
      uint immutable  rat2=80;
      
      
      
   

   constructor(){
      owner=payable (msg.sender);
  }
  receive() external payable {
      add1.transfer(msg.value*20/100);
      add2.transfer(msg.value*80/100);
      
      
      

  }
  };