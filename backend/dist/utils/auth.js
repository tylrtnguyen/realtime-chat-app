"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.join = exports.login = exports.register = exports.verifyToken = exports.newToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _validation = require("./validation");

var _admin = require("../resources/admin/admin.model");

var _user = require("../resources/user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import necessary libraries

/* 
Methods need to be implemented
newToken
verifyToken
register
login
protect
*/
_dotenv2.default.config();

const newToken = exports.newToken = user => {
  return _jsonwebtoken2.default.sign({
    id: user._id
  }, process.env.TOKEN, {
    expiresIn: "1h"
  });
};

const verifyToken = exports.verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken2.default.verify(token, process.env.TOKEN, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

const register = exports.register = async (req, res) => {
  // Pass user input to be validated with Joi
  const {
    error
  } = (0, _validation.registerValidation)(req.body); // Return error if invalid input

  if (error) return res.status(400).send(error);

  try {
    // Password salting and hasing
    const salt = await _bcrypt2.default.genSalt(10);
    const hashedPassword = await _bcrypt2.default.hash(req.body.password, salt);
    const admin = new _admin.Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    const savedAdmin = await admin.save();
    res.status(201).send({
      success: true,
      message: `Admin: ${savedAdmin.name} is already registered`
    });
  } catch (error) {
    res.status(400).end();
  }
};

const login = exports.login = async (req, res) => {
  try {
    const {
      error
    } = (0, _validation.loginValidation)(req.body);
    if (error) return res.status(400).send(error.details[0].message); // Check if the admin exists using email

    const adminData = req.body;
    const admin = await _admin.Admin.findOne({
      email: adminData.email
    }).select("email password").exec();

    if (!admin) {
      return res.status(401).send("Email or password is invalid");
    }

    const passwordCorrect = await _bcrypt2.default.compare(adminData.password, admin.password);

    if (!passwordCorrect) {
      res.status(400).send("Invalid Credentials");
    } // Assign a new token


    const token = newToken(admin);
    return res.status(200).json({
      success: true,
      token,
      expiresIn: "3600s",
      role: "admin"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

const join = exports.join = async (req, res) => {
  try {
    const userData = req.body;
    const user = await _user.User.findOne({
      name: userData.name
    }).lean().exec(); // Ask Jordan

    if (!user) {
      user = await _user.User.create(req.body);
    }

    const token = newToken(user);
    return res.status(200).json({
      success: true,
      token,
      expiresIn: "3600s"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Server error"
    });
  }
};

const protect = exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  req.user = payload;
  next();
};