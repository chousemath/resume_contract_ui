import web3 from './web3';

const abi = [{ "constant": true, "inputs": [], "name": "getUsers", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getAddressCity", "outputs": [{ "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteDocument1", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deletePhone", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDateOfBirth", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "position", "type": "bytes32" }], "name": "setPosition", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getAddressZipcode", "outputs": [{ "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "uint32" }], "name": "setAddressCity", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getPosition", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteProfileImage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDocument5", "outputs": [{ "name": "title", "type": "bytes32" }, { "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "applicant", "type": "address" }], "name": "setConfirmationDate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_collaborator", "type": "address" }], "name": "removeCollaborator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteName", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteDocument5", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDocument3", "outputs": [{ "name": "title", "type": "bytes32" }, { "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "users", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDocument4", "outputs": [{ "name": "title", "type": "bytes32" }, { "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteDocument2", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "title", "type": "bytes32" }, { "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "addDocument3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDocument2", "outputs": [{ "name": "title", "type": "bytes32" }, { "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "manager", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getDocument1", "outputs": [{ "name": "title", "type": "bytes32" }, { "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getEmail", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deletePosition", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteEmail", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "setProfileImage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "phone", "type": "bytes32" }], "name": "setPhone", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "bytes32" }], "name": "setName", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getName", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getPhone", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_collaborator", "type": "address" }], "name": "isCollaborator", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteAddressRegion", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getAddressStreet", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteDateOfBirth", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteGender", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getAddressRegion", "outputs": [{ "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteDocument4", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "title", "type": "bytes32" }, { "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "addDocument5", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "applicant", "type": "address" }], "name": "getConfirmationDate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "uint32" }], "name": "setAddressZipcode", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteAddressStreet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteAddressCity", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "timestamp", "type": "uint256" }], "name": "setDateOfBirth", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "bytes32" }], "name": "setAddressStreet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "uint32" }], "name": "setAddressRegion", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "gender", "type": "uint8" }], "name": "setGender", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "email", "type": "bytes32" }], "name": "setEmail", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getGender", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newCollaborator", "type": "address" }], "name": "addCollaborator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "sender", "type": "address" }], "name": "getProfileImage", "outputs": [{ "name": "digest", "type": "bytes32" }, { "name": "hashFunction", "type": "uint8" }, { "name": "size", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "title", "type": "bytes32" }, { "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "addDocument2", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deleteAddressZipcode", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }], "name": "deleteDocument3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "title", "type": "bytes32" }, { "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "addDocument4", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "title", "type": "bytes32" }, { "name": "_digest", "type": "bytes32" }, { "name": "_hashFunction", "type": "uint8" }, { "name": "_size", "type": "uint8" }], "name": "addDocument1", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]
const address = '0xF7CCF14c7eb1Cc05916253d783040f4906737fD6';