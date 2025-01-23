const mongoose = require("mongoose");
const { createHmac ,randomBytes} = require('node:crypto');
const { setuser } = require("../services/auth");
const Joi = require("joi");

// const userValidationSchema = Joi.object({
//     name: Joi.string()
//       .trim()
//       .min(2)
//       .max(50)
//       .required()
//       .messages({
//         'string.empty': 'Name cannot be empty',
//         'string.min': 'Name must be at least 2 characters long',
//         'string.max': 'Name cannot exceed 50 characters'
//       }),
    
//     email: Joi.string()
//       .trim()
//       .email()
//       .required()
//       .messages({
//         'string.email': 'Invalid email format',
//         'string.empty': 'Email is required'
//       }),
    
//     password: Joi.string()
//       .min(8)
//       .max(72)
//       .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
//       .required()
//       .messages({
//         'string.min': 'Password must be at least 8 characters long',
//         'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
//       }),
    
//     role: Joi.string()
//       .valid('USER', 'ADMIN')
//       .default('USER')
//   });
  
//   // Middleware for validation

//   function validateUser(req, res, next) {
//     const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    
//     if (error) {
//       const errorMessages = error.details.map(detail => detail.message);
//       return res.status(400).json({ 
//         errors: errorMessages 
//       });
//     }
    
//     next();
//   }

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },

    salt : {
        type : String,
       
    },
    password : {
        type : String,
        required : true,

    },
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER",
    }

},{timestamps : true})

// check for validation 



UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified("password")) return ;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');
               this.salt = salt;
               this.password = hashedPassword;


    next();
  });

  UserSchema.static('matchPasswordandGenerateToken',async function(email,password){
    const user = await this.findOne({email}); 
    if(!user) throw new Error('User dont found')
    const salt =  user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
   if(hashedPassword !==userProvidedHash) throw new Error('User dont found');
    const token = setuser(user);
   
    return token;
 });

const User = mongoose.model("user",UserSchema);

module.exports =User;
