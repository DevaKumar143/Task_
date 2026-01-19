const { Router } = require("express");
const {Register ,loginUser} = require("../controller/userController")
const router = Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name", "Enter name").isLength({ min: 3 }),
    body("email", "Enter A correct Email").isEmail(),
    body("password", "Password can not be Empty").isLength({ min: 3 }),
  ], Register
);


router.post(
  "/login",
  [
    body("email", "Enter Correct Email").isEmail(),
    body("password", "Enter PAsswword").exists(),
  ], loginUser
);



module.exports = router;




