const User = require('../models/User');

const bcrypt = require('bcryptjs')

class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static register(req, res){ 
    res.render('auth/register')
  }

  static async registerPost(req, res){

    const {username, email, password, confirmPassword} = req.body

    // user verification
    if(username.length < 4){
      req.flash('message', "The username must have at least 4 characters")
      res.render('auth/register', {error: true})
      return
    }

    const checkExistingUser = await User.findOne({where: {username}})
    if(checkExistingUser){
      req.flash('message', "The current username is already in use")
      res.render('auth/register', {error: true})
      return
    }


    // email verification
    const checkExistingEmail = await User.findOne({where: {email}})
    if(checkExistingEmail){
      req.flash('message', "The current email is already in use")
      res.render('auth/register', {error: true})
      return
    }
    
    // password validation
    if(password.length < 8){
      req.flash('message', "The password must have at least 8 characters")
      res.render('auth/register', {error: true})
      return
    }
    if(password != confirmPassword){
      console.log(password +'|'+ confirmPassword)
      req.flash('message', "The passwords don't match.")
      res.render('auth/register', {error: true})
      return
    }

    // hashing and salting password

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    
    const user = {
      username,
      email,
      password: hashed
    }

    try{
      await User.create(user)

      // Initialize session
      req.session.userid = user.id
      req.flash('message', "User registered succesfully")

      req.session.save(() => {
        res.redirect('/')
        
      })
    }catch(e){
      console.log(e)
    }
  }

}

module.exports = AuthController;
