const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    // common for all
    userType: {
      type: String,
      required: true,
      enum: ["donar", "hospital", "organization", "admin"],
    },
    //name field is for admin and donar
    name: {
      type: String,
      required: function () {
        if (this.userType == "donar" || this.userType == "admin") {
          return true;
        }
        return false;
      },
    },
    owner: {
      type: String,
      required: function () {
        if (this.userType == "hospital" || this.userType == "organization") {
          return true;
        }
        return false;
      },
    },
    //adhar card for donar
    aadharcardnumber: {
      type: String,
      unique: true,
      required: function () {
        if (this.userType == "donar") {
          return true;
        }
        return false;
      },
    },
    bloodgroup: {
      type: String,
      required: function () {
        if (this.userType == "donar") {
          return true;
        }
        return false;
      },
    },

    //hospital Name is for hospital
    hospitalName: {
      type: String,
      required: function () {
        if (this.userType == "hospital") {
          return true;
        }
        return false;
      },
    },
    //organization Name is for organization
    organizationName: {
      type: String,
      required: function () {
        if (this.userType == "organization") {
          return true;
        }
        return false;
      },
    },

    email: {
      type: String,
      required: false,

      required: function () {
        if (this.userType == "hospital" || this.userType == "organization") {
          return true;
        }
        return false;
      },
      unique: false,
    },

    password: {
      type: String,
      required: function () {
        if (this.userType == "hospital" || this.userType == "organization") {
          return true;
        }
        return false;
      },

    },    otp: String, // Store the OTP here
  otpExpiration: Date, // Store OTP expiration time
  isVerified: {
    type: Boolean,
    default: false,
  }, 
    // common for all
    phone: {
      type: String,
      required: true,
    },
    //website is for hospital and organization
    website: {
      type: String,
      required: function () {
        if (this.userType == "hosiptal" || this.userType == "organization") {
          return true;
        }
        return false;
      },
    },
    // address is for hospital and organization
    address: {
      type: String,
      required: function () {
        if (this.userType == "hosiptal" || this.userType == "organization") {
          return true;
        }
        return false;
      },
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
