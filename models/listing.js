const mongoose = require("mongoose");
const Schema = mongoose.Schema;// this is written bcz to avoid rewrite mongoose.schema
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
        // type:String,
        // default:"https://images.unsplash.com/photo-1493589976221-c2357c31ad77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjN8NUhKZC1hYlROTG98fGVufDB8fHx8fA%3D%3D",
        // set:(v)=> v==""?
        // "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjN8NUhKZC1hYlROTG98fGVufDB8fHx8fA%3D%3D"
        // :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing ){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;