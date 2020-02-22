// Import necessary libraries
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { loginValidation, registerValidation } from './validation'
import { Admin } from '../resources/admin/admin.model'

/* 
Methods need to be implemented
newToken
verifyToken
register
login
protect
*/

dotenv.config()

export const newToken = admin => {
    return jwt.sign({id: admin._id}, process.env.TOKEN, {expiresIn: '1h'})
}

export const verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN, (err, payload) => {
            if(err) return reject(err.name);
            resolve(payload)
        })
    })
}

export const register = async(req, res) => {
    // Pass user input to be validated with Joi
    const {error} = registerValidation(req.body)
    // Return error if invalid input
    if (error) return res.status(400).send(error)

    // Password salting and hasing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedAdmin = await admin.save((error) => {
            console.log(error);
        });
        res.status(201).send(
            {
                message: `Admin: ${savedAdmin.name} is already registered`
            }
        )

    }
    catch (error) {
        console.log(error)
        res.status(400).end()
    }
}

export const login = async (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) res.status(400).send(error.details[0].message)
    
    // Check if the admin exists using email
    const adminData = req.body
    const admin = await Admin.findOne({email: adminData.email}).select('email password').exec()
    if(!admin){
        res.status(401).send("Email or password is invalid")
    }

    const passwordCorrect = await bcrypt.compare(adminData.password, admin.password)

    if (!passwordCorrect) {
        res.status(400).send("Invalid Credentials")
    }

    // Assign a new token
    const token = newToken(admin);
    res.status(200).json({
        token,
        expiresIn:'3600s',
        status: 'Logged In'
    })
}

export const protect = async(req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer || !bearer.startsWith('Bearer ')){
        res.status(401).send("Not authorized")
    }

    const token = bearer.split(' ')[1]

    // Verify token
    let payload 
    try {
        payload = await verifyToken(token)
    }
    catch (error) {
        console.log(error.name)
        res.status(401).send("Invalid token")
    }

    req.user = payload
    next()
}
