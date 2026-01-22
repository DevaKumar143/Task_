const { header } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWR_SECRETE = "SurajVishea@122";

module.exports = (req, res, next) =>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(404).send("Enter A correct Authentication");
    }
    try {
        const data = jwt.verify(token, JWR_SECRETE);
         req.user = data.user;
        next();
    } catch (error) {
       return res.status(500).send("Enter Correct Authenticate"); 
    }
}