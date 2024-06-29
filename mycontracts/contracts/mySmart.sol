// SPDX-License-Identifier: GPL-3.0
  pragma solidity = 0.8.26;
  contract MySmart {
      uint256 number;
      address  payable owner;
      address  payable add1=payable(0xe9f484f0669c3d467b026da1f5562b01eed8dc53);
      address  payable add1=payable(0xe9f484f0669c3d467b026da1f5562b01eed8dc53);
      
      
      
      uint immutable  rat1=45;
      uint immutable  rat2=55;
      
      
      
   

   constructor(){
      owner=payable (msg.sender);
  }
  receive() external payable {
      add1.transfer(msg.value*45/100);
      add2.transfer(msg.value*55/100);
      
      
      

  }
  };