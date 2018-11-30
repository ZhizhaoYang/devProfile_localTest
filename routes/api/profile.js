const express = require("express");
const router = express.Router();

const passport = require("passport");
const mongoose = require("mongoose");

// Load profile model shcema
const Profile = require("../../models/Profile");

// Load input validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get("/test", (req, res) => {
  return res.status(200).json({
    msg: "profile page works"
  });
});

// @route   Get api/profile
// @desc    Return current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // For holding errors
    const errors = {};

    // Look for the profile according to id
    // Because we set the Profile schema user item --> type: Schema.Types.ObjectId
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

// @route   POST api/profile
// @desc    Create or edit user's profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the data input
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get profile fields
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.profileUserName)
      profileFields.profileUserName = req.body.profileUserName;

    if (req.body.phone) profileFields.phone = req.body.phone;

    if (req.body.company) profileFields.company = req.body.company;

    if (req.body.website) profileFields.website = req.body.website;

    if (req.body.location) profileFields.location = req.body.location;

    if (req.body.jobStatus) profileFields.jobStatus = req.body.jobStatus;

    if (req.body.bio) profileFields.bio = req.body.bio;

    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (req.body.skills) {
      // profileFields.skills = req.body.skills.split(",").map(skill => {
      //   return skill.trim();
      // });
      profileFields.skills = req.body.skills;
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          // populate() method can be used in the properties have a type of mongoose.Schema
          // populate(schema.property, [property.elements])
          .populate("user", ["name"])
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      } else {
        // Create

        // Check if profileUserName exists
        Profile.findOne({
          profileUserName: profileFields.profileUserName
        }).then(profile => {
          if (profile) {
            errors.profileUserName = "The profile name already exists";
            return res.status(400).json(errors);
          }

          // Save new profile
          var newProfile = new Profile(profileFields);

          newProfile
            .save()
            .then(newProfile => {
              res.status(200).json(newProfile);
            })
            .catch(err => {
              res.status(400).json(err);
            });
        });
      }
    });
  }
);

// @route   POST api/profile/update
// @desc    Update user's profile
// @access  Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    options = {};
    options.user = req.user.id;

    if (req.body.profileUserName)
      options.profileUserName = req.body.profileUserName;

    if (req.body.company) options.company = req.body.company;

    if (req.body.website) options.website = req.body.website;

    if (req.body.location) options.location = req.body.location;

    if (req.body.jobStatus) options.jobStatus = req.body.jobStatus;
    options.bio = req.body.bio;

    if (req.body.githubusername)
      options.githubusername = req.body.githubusername;

    options.socialLinks = {};
    if (req.body.youtube) options.socialLinks.youtube = req.body.youtube;
    if (req.body.twitter) options.socialLinks.twitter = req.body.twitter;
    if (req.body.linkedIn) options.socialLinks.linkedIn = req.body.linkedIn;
    if (req.body.facebook) options.socialLinks.facebook = req.body.facebook;
    if (req.body.instagram) options.socialLinks.instagram = req.body.instagram;

    if (req.body.skills) {
      // options.skills = req.body.skills.split(",").map(skill => {
      //   return skill.trim();
      // });
      options.skills = req.body.skills;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: options },
          { new: true }
        )
          .then(profile => {
            res.status(200).json(profile);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      } else {
        errors.profileNotFound = "Profile should be created before update";
        res.status(404).json(errors);
      }
    });
  }
);

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "email"])
    .then(profiles => {
      if (profiles.length !== 0) {
        res.status(200).json(profiles);
      } else {
        errors.noProfiles = "There is no profile in the list";
        res.status(404).json(errors);
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/profile/username/:username
// @desc    GET profile by a profile user name
// @access  Public
router.get("/username/:username", (req, res) => {
  const errors = {};

  // Find the profile by profile user name that user input
  // :username is stored in req.params
  Profile.findOne({ profileUserName: req.params.username })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the data input
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Pass new experience properities and create new experience object
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to experience array
          profile.experience.unshift(newExp);

          // Save
          profile.save().then(newProfile => {
            res.json(newProfile);
          });
        } else {
          errors.profileNotFound = "Profile not found";
          res.json(errors);
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate the data input
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find the profile according to user id
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Pass new education properities and create new education object
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to education array
          profile.education.unshift(newEdu);

          // Save
          profile.save().then(newProfile => {
            res.json(newProfile);
          });
        } else {
          errors.profileNotFound = "Profile not found";
          res.json(errors);
        }
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   GET api/profile/:user_id
// @desc    GET profile by user id
// @access  Public
router.get("/:user_id", (req, res) => {
  const errors = {};

  // Find the profile by user_id that user input
  // :user_id is stored in req.params
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(err => {
      res.status(400).json({ error: "User id format invalid" });
    });
});

// @route   POST api/profile/addSkills
// @desc    POST profile skills
// @access  Private
router.post(
  "/addSkills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // To Do:
    // 1. validate the skills input
    // 2. find the profile by { user: req.user.id }
    // 3. add the new skills to skills array
    // 4. save db and return new skills array
  }
);

module.exports = router;
