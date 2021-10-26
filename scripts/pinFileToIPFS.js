require("dotenv").config();
const path = require('path');
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { storeDataToFile } = require("./ipfsHelper.js");
let ipfsImageHash;
let metahash;

// Calls Pinata API's to pin file to IPFS

const pinFileToIPFSs = async (filePath) => {
  const pinataEndpoint = process.env.PINATA_ENDPOINT;
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataApiSecret = process.env.PINATA_API_SECRET;
  const form_data = new FormData();
  try {
    form_data.append("file", fs.createReadStream(filePath));
    const request = {
      method: "post",
      url: pinataEndpoint,
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
        "Content-Type": `multipart/form-data; boundary=${form_data._boundary}`,
      },
      data: form_data,
    };

    //console.log('request:', request);

    const response = await axios(request);
    // console.log("IpfsHash",response.data.IpfsHash);
    ipfsImageHash = response.data.IpfsHash;
    console.log("HashIPFS", ipfsImageHash);
    console.log('Successfully pinned file to IPFS : ', response);
   // await storeDataToFile(response.data);
    console.log('Successfully added IPFS response to json file');
  } catch (err) {
    console.log('Error occurred while pinning file to IPFS: ', err);
  }
  metahash = {
    attributes: [
      {
        trait_type: "Color",
        value: "Black",
      },
    ],
    description: "Human Power!",
    image: "https://ipfs.io/ipfs/" + ipfsImageHash,

    name: "Human Die",
  };
  var jsonContent = JSON.stringify(metahash);
  console.log(jsonContent);

  fs.writeFile('./data/output.json', jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
 
};



const pinFileToIPFS1 = async () => {
  const filePath1 = path.join(__dirname, '../data/output.json');
  const pinataEndpoint = process.env.PINATA_ENDPOINT;
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataApiSecret = process.env.PINATA_API_SECRET;
  const form_data = new FormData();
  try {
    form_data.append("file", fs.createReadStream(filePath1));
    const request = {
      method: "post",
      url: pinataEndpoint,
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
        "Content-Type": `multipart/form-data; boundary=${form_data._boundary}`,
      },
      data: form_data,
    };

    //console.log('request:', request);

    const response = await axios(request);
    // console.log("IpfsHash",response.data.IpfsHash);
    ipfsImageHash = response.data.IpfsHash;
    console.log("HashIPFS", ipfsImageHash);
     console.log('Successfully pinned file to IPFS : ', response);
    await storeDataToFile(response.data);
    console.log('Successfully added IPFS response to json file');
  } catch (err) {
    console.log('Error occurred while pinning file to IPFS: ', err);
  }
};

module.exports = {
  pinFileToIPFSs,
  pinFileToIPFS1
}
