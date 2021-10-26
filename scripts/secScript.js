const path = require('path');
const pinFileToIPFS1 = require('./ipfsMetadata');


const filePath1 = path.join(__dirname, '../data/output.json');

pinFileToIPFS1(filePath1);