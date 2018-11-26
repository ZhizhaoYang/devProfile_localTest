const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = profile => {
  let errors = {};

  profile.profileUserName = !isEmpty(profile.profileUserName)
    ? profile.profileUserName
    : "";
  profile.jobStatus = !isEmpty(profile.jobStatus) ? profile.jobStatus : "";
  profile.skills = !isEmpty(profile.skills) ? profile.skills : "";

  if (!Validator.isLength(profile.profileUserName, { min: 2, max: 40 })) {
    errors.profileUserName = "Profile name needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(profile.profileUserName)) {
    errors.profileUserName = "Profile name is required";
  }

  if (Validator.isEmpty(profile.jobStatus)) {
    errors.jobStatus = "Job status field is required";
  }

  // if (Validator.isEmpty(profile.skills)) {
  //   errors.skills = "Skills field is required";
  // }

  if (!isEmpty(profile.website)) {
    if (!Validator.isURL(profile.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(profile.youtube)) {
    if (!Validator.isURL(profile.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(profile.twitter)) {
    if (!Validator.isURL(profile.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(profile.facebook)) {
    if (!Validator.isURL(profile.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(profile.linkedin)) {
    if (!Validator.isURL(profile.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(profile.instagram)) {
    if (!Validator.isURL(profile.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
