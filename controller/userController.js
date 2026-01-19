const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {  validationResult } = require("express-validator");
const JWR_SECRETE = "SurajVishea@122";

exports.Register =  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.result() });
      }

      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(401).send("Enter Unique Email");
      }

      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const Authtoken = jwt.sign(data, JWR_SECRETE);
      res.json({ Authtoken });
    } catch (error) {
      console.log(error.message);
    }
  }


exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.result() });
      }
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: "Enter Correct Email" });
      }
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.status(402).send("Enter Correct Password");
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const Authtoken = jwt.sign(data, JWR_SECRETE);
      res.send({ Authtoken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }