import Web3 from 'web3';

// we are going to hijack metmask's version of web3 with all necessary configuration performed
const metamaskWeb3 = window.web3.currentProvider;
// we then feed in metamask's version of web3 into our own version of web3
const web3 = new Web3(metamaskWeb3);
export default web3;