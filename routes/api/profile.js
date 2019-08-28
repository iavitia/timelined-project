const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// GET api/profile - get current user profile - private route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "username")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET api/profile/username/:username - get profile by username
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", "username")
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => res.status(404).json({ profiles: "There are no profiles" }));
});

// GET api/profile/user/:username - get profile by username
router.get("/username/:username", (req, res) => {
  const errors = {};

  User.findOne({ username: req.params.username }).then(user => {
    // If user doesn't exist
    if (!user) {
      errors.nouser = "User doesn't exist";
      return res.status(404).json(errors);
    }

    // if they have no profile
    Profile.findOne({ user: user.id })
      .populate("user", "username")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });
});

// GET api/profile/user/:user_id - get profile by user id
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.user_id })
    .then(user => {
      // If user doesn't exist
      if (!user) {
        errors.nouser = "User doesn't exist";
        return res.status(404).json(errors);
      }

      // if they have no profile
      Profile.findOne({ user: user.id })
        .populate("user", "username")
        .then(profile => {
          if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
          }
          res.json(profile);
        });
    })
    .catch(err => res.status(404).json({ userbyid: "User doesn't exist" }));
});

// POST api/profile - create or edit user profile - private route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.image) profileFields.image = req.body.image;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;

    // Social media links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    // If profile exists, update profile. If not, create profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
