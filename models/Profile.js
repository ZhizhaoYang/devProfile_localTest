const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user, *profileUserName, company, website, location,
// *jobStatus, *skills, bio, githubusername,

// experience: [{*title, *company, location, *from, to, current, description}],

// education: [{*school, *degree, *fieldOfStudy, *from, to, current,, description}],

// socialLinks: {youtu, facebook, linkedin, instagram, twitter},

// date

// Create Schema
const ProfileSchema = new Schema({
  // user's id
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  profileUserName: {
    type: String,
    required: true,
    max: 40
  },

  phone: {
    type: String,
    max: 30
  },

  company: {
    type: String
  },

  personalWebsite: {
    type: String
  },

  location: {
    type: String
  },

  jobStatus: {
    type: String,
    required: true
  },

  skills: [
    {
      type: Object,

      id: {
        type: Number
      },
      skillName: {
        type: String,
        required: true
      },
      percentage: {
        type: String
      }
    }
  ],

  bio: {
    type: String
  },

  githubusername: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  socialLinks: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
    // UTC Time(Lodon Time)
  }
});

module.exports = mongoose.model("profiles", ProfileSchema);
