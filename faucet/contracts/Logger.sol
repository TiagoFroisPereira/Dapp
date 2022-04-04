// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// It's a way for designer to say that
// "any child of the abstract contract has to implement specific methods"

abstract contract Logger {
    function emitLog() public pure virtual returns(bytes32);
}