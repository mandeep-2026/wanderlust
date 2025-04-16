const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,va} = require("../middleware.js");
const { authorize } = require("passport");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single(`listing[image]`),
    validateListing,
    wrapAsync(listingController.createListing)
);

// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
        isLoggedIn,
        isOwner,
        upload.single(`listing[image]`),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
.delete(
    isLoggedIn,  
    isOwner,
    wrapAsync(listingController.destroyListing)
);

// create route
// router.post("/",isLoggedIn, from here to wrapasync all are shifted to router.route i have kept for understnding the next cooment things
//     validateListing,
//     wrapAsync(listingController.createListing));
    // let {title,description,image,price,location,country} = req.body; this is one method to get all details and another method is to make key value like listing[title] in new.ejs and in post now write this
        // now  second method
        // let result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error); this is used in middleware form in above
        // }
    // if(!req.body.listing){this is frst start
        //     throw new ExpressError(400,"Send valid data for listing");
        // } these were the first method to for validation schema 
        // if(!newListing.title){
        //     throw new ExpressError(400,"Title is missing");
        // }
        // if(!newListing.description){
        //     throw new ExpressError(400,"Description is missing");
        // }
        // if(!newListing.location){
        //     throw new ExpressError(400,"Location is missing");
        // }

// edit route(
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;