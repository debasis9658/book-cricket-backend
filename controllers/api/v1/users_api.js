
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        console.log('error in the main  logic');
        

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        return res.json(200, {
            message: "Sign-up succesful, Here is your token. Please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })
        
    }
    catch(err){
        return res.json(500, {
            message: "Internal server error"
        });
    }
};

module.exports.signup = async function(req, res) {
    try {
      const { name, email, password } = req.body;
  
      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: newUser._id },
        'your-secret-key', // Replace with your own secret key
        { expiresIn: '1h' } // Token expiration time
      );
  
      return res.status(200).json({
        message: 'Signup successful',
        data: {
          user: newUser,
          token: token
        }
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  };

  module.exports.signin = async function(req, res) {
    try{
        let user = await User.findOne({email: req.body.email});
        

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        return res.json(200, {
            message: "Sign-up succesful, Here is your token. Please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'}),
                name: user.name,
                email: user.email
            }
        })
        
    }
    catch(err){
        return res.json(500, {
            message: "Internal server error"
        });
    }
  };

