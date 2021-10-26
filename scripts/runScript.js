const path = require('path');
const {pinFileToIPFSs,pinFileToIPFS1} = require('./pinFileToIPFS');z
const filePath = path.join(__dirname, '../assets/light.gif');

const funct = async()=>{
    await pinFileToIPFSs(filePath);
    console.log("Redy to run second function")
    await pinFileToIPFS1();
}

funct()