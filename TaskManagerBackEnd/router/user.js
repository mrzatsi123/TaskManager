const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require( 'jsonwebtoken' );
const cors = require('cors');

router.post('/signup', async (req, res) => {
  try {
    const data = await req.body;
    const newUser = new User(data);
    const salt = bcrypt.genSaltSync(10);
    const crypted_pass = await bcrypt.hashSync(newUser.password, salt);
    newUser.password = crypted_pass; // Corrected typo

    await newUser.save();
    res.status(200).send("Data added successfully");
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send("Error adding new user. Please check details."); // More informative error message
  }
});


router.post('/login', async (req, res) => {
  
  let data = req.body 
  const user= await User.findOne({email: data.email})
if(!user){
  return res.status(404).send( "No account found with this email." )

}else{
    let validpass = bcrypt.compareSync(data.password, user.password)
     if (!validpass) {
       return res.status(401).send("Wrong password.")
     }else{
     let payload={
        id: user._id,
        name : user.name,
        email :user.email
      }
        let token = jwt.sign(payload,'12345')
        res.status(200).json({mytoken:token})
    }

}

});




  router.get("/show", async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching users"); 
    }
  });
  
  
  // Get User by ID route
  router.get("/user/:id", async (req, res) => {
      try {
        const { id } = req.params; // Extract ID from request parameters
    
        const user = await User.findById(id); // Find user by ID
    
        if (!user) {
          return res.status(404).send("User not found"); // Handle case where user is not found
        }
    
        res.status(200).json(user); // Send the user data as JSON
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching user"); // More specific error message
      }
    });
  
  router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const updateData = req.body; // Get update data from request body
  
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }); // Update user and return updated document
  
      if (!updatedUser) {
        return res.status(404).send("User not found"); // Handle case where user is not found
      }
  
      res.status(200).send("User updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating user"); // More specific error message
    }
  });
  
  router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params; // Extract ID from request parameters
  
      const deletedUser = await User.findByIdAndDelete(id); // Delete user by ID
  
      if (!deletedUser) {
        return res.status(404).send("User not found"); // Handle case where user is not found
      }
  
      res.status(200).send("User deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting user"); // More specific error message
    }
  });



module.exports = router ;