"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.login = exports.register = exports.verifyToken = exports.newToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _validation = require("./validation");

var _admin = require("../resources/admin/admin.model");

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

const newToken = exports.newToken = admin => {
  return _jsonwebtoken2.default.sign({
    id: admin._id
  }, process.env.TOKEN, {
    expiresIn: '1h'
  });
};

const verifyToken = exports.verifyToken = token => {
  new Promise((resolve, reject) => {
    _jsonwebtoken2.default.verify(token, process.env.TOKEN, (err, payload) => {
      if (err) return reject(err.name);
      resolve(payload);
    });
  });
};

const register = exports.register = async (req, res) => {
  // Pass user input to be validated with Joi
  const {
    error
  } = (0, _validation.registerValidation)(req.body); // Return error if invalid input

  if (error) return res.status(400).send(error); // Password salting and hasing

  const salt = await _bcrypt2.default.genSalt(10);
  const hashedPassword = await _bcrypt2.default.hash(req.body.password, salt);
  const admin = new _admin.Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedAdmin = await admin.save(error => {
      console.log(error);
    });
    res.status(201).send({
      message: `Admin: ${savedAdmin.name} is already registered`
    });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

const login = exports.login = async (req, res) => {
  const {
    error
  } = (0, _validation.loginValidation)(req.body);
  if (error) res.status(400).send(error.details[0].message); // Check if the admin exists using email

  const adminData = req.body;
  const admin = await _admin.Admin.findOne({
    email: adminData.email
  }).select('email password').exec();

  if (!admin) {
    res.status(401).send("Email or password is invalid");
  }

  const passwordCorrect = await _bcrypt2.default.compare(adminData.password, admin.password);

  if (!passwordCorrect) {
    res.status(400).send("Invalid Credentials");
  } // Assign a new token


  const token = newToken(admin);
  res.status(200).json({
    token,
    expiresIn: '3600s',
    status: 'Logged In'
  });
};

const protect = exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.name);
    res.status(401).send("Authentication Failed");
  }
};