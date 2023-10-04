const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


//register a new user

router.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    // Check if a user with the same Aadhar card number already exists
    const userTypes = req.body.userType;
    console.log("register User type:", userTypes);
    if (userTypes === "donar") {
      const existingUser = await User.findOne({
        aadharcardnumber: req.body.aadharcardnumber,
      });

      if (existingUser) {
        return res.send({
          success: false,
          message: "User already exists with the provided Aadhar card number.",
        });
      }
      const newUser = new User(req.body);
      await newUser.save();
      return res.send({
        success: true,
        message: "User registered successfully",
      });
    } else {
      // Hash the password

      if (userTypes === "hospital" || userTypes === "organization") {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.send({
            success: false,
            message: "User already exists with the provided Email.",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword;

          // Create a new user document and save it to the database
          const newUser = new User(req.body);
          await newUser.save();
          return res.send({
            success: true,
            message: "User registered successfully",
          });
        }
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({
      success: false,
      message: "Registration failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", req.body);
    //check if user exists
    const userTypes = req.body.userType;
    console.log("User type login:",userTypes);
    if (userTypes === "donar"){
      const users = await User.findOne({ aadharcardnumber : req.body.aadharcardnumber });
      if (!users) {
        return res.send({
          message: "user does not exists",
          success: false,
        });
      }
      
    }
    if (userTypes === "hospital" || userTypes === "organization") {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        message: "user does not exists",
        success: false,
      });
    }
        // check if userType matches
        if (user.userTypes !== req.body.userTypes) {
          return res.send({
            success: false,
            message: `User is not registered as ${req.body.userType}`,
          });
        }
    
    //compare password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.send({
        success: false,
        message: "Invalid password.",
      });
    }

    // Create a JWT token for authentication 1st parameter will be data we want to encrypt 2nd will be  secret key to decrypt the data 3rd will be timeout(how much time will be the validity is)
    
    const payload ={ userId: user._id }; 
    const secretKey ='Blood-bank' //process.env.jwt_secret
    const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
    console.log("token is here ", token);
    return res.send({
      success: true,
      message: "user logged in sucessfully",
      data: token,
    });
  }} catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
}
);

  // generate token
//   const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
//     expiresIn: "1d",
//   });
// console.log("sign is going",token)
//   return res.send({
//     success: true,
//     message: "User logged in successfully",
//     data: token,
//   });
// }} catch (error) {
//   return res.send({
//     success: false,
//     message: error.message,
//   });
 
// }

// });

//get current user
// router.get("/get-Current-User",authMiddleware,async (req,res)=>{
// try {
//   const user = await user.findOne({_id:req.body.userid});
//   console.log("getuser",user)
//   // remove password of user
//   user.password = undefined;
//   return res.send({
//     success:true,
//     message:"user fetched succesfully",
//     data:user,
//   })
  
// } catch (error) {
//  return res.send({
//   success:false,
//   message:error.message,
 
//  })
// }
// })

// get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({  
      _id: req.body.userId });
    console.log("user is",user)
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router; // check this line

