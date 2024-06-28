// SPDX-License-Identifier: GPL-3.0

pragma solidity = 0.8.26;

contract MySmart {
    uint256 number;
    address  payable owner;
    address  payable add1=payable(0xe9F484F0669C3D467b026Da1f5562B01EeD8dC53); //Linea test4;
    address  payable add2=payable(0x8189C2f5F44E1863079fE22180a2917d1f5cE504);//Linea test3;
    address  payable add3=payable(0x6A5C7F4E7cAa494857cDdb65509613C29eA7982a);//Linea test2;
    uint immutable  rat1=20;
    uint immutable  rat2=50;
    uint immutable  rat3=30;
 constructor(){
    owner=payable (msg.sender);
}
receive() external payable {
    add1.transfer(msg.value*rat1/100);
    add2.transfer(msg.value*rat2/100);
    add3.transfer(msg.value*rat3/100);
}

  
}