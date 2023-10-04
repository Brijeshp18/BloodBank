// const jwt = require("jsonwebtoken")
// module.exports = function (req,res,next){
//     try {
        
//         const token = req.header("authorization").replace("Bearer ", "");
//         const secretkey = 'Blood-bank'
//         // const secretKey ='Blood-bank'
//         const decryptedData = jwt.verify(token,secretkey);
//         console.log("secret",decryptedData)
//         const userid = user._id;
//         req.body.userid=decryptedData.userid;
//         next();
//     } catch (error) {
//        return res.send({
//             success:false,
//             message:error.message,
//         })
        
//     }



const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const secretKey ='Blood-bank' 
    const token = req.header("authorization").replace("Bearer ", "");
    // console.log('SECRET_KEY:', secretKey);
    const decryptedData = jwt.verify(token, secretKey);
    req.body.userId = decryptedData.userId;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};





