//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();
const multer = require("multer");

//Load Schema
const Profile = require("../../Model/Profile");
//Load multer
const { storage } = require("../../config/multer");
const upload = multer({ storage });

//@ http method GET
//@description its profile get information
//@access PUBLIC
router.get("/", (req, res) => {
  res.send("i am profile router");
});

router.get("/create-profile", (req, res) => {
  res.render("./profiles/create-profile");
});
router.get("/all-profiles", (req, res) => {
  //find Profile collections and fetch data from that collection
  Profile.find({})
    .sort({ date: "desc" })
    .lean()
    .then((profile) => {
      res.render("./profiles/all-profiles", { profile });
    })
    .catch((err) => console.log(err));
});

/*========================GET USER PROFILE DETAILS ========================*/
router.get("/user-details/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .lean()
    .then((profile_detail) => {
      res.render("./profiles/user-profile", { profile_detail });
    })
    .catch((err) => console.log(err));
});

// @http method POST
// @description CREATE PROFILE DATA
// @access PRIVATE

router.post("/create-profile", upload.single("photo"), (req, res) => {
  let {
    firstname,
    lastname,
    designation,
    phone,
    skills,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  } = req.body;
  let newProfile = {
    photo: req.file,
    firstname,
    lastname,
    phone,
    designation,
    skills,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  };

  new Profile(newProfile)
    .save()
    .then((profile) => {
      res.redirect("/profile/all-profiles", 201, { profile });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
