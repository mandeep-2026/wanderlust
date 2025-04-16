const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}  

const initDB = async() => {
    await Listing.deleteMany({});
    // console.log(initData.data[0].image);// if any data present in db so delete it
    initData.data = initData.data.map((obj)=>(
        {...obj,
        owner:"67f353c866b994d517ebf479"}));
    await Listing.insertMany(initData.data);// to insert new data which is in data ie sampleListing
    console.log("data was initialized");
};
initDB();