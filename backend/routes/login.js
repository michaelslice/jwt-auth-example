/* 

Handle client credentials and give them a JWT token

*/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * POST users listing.
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @return a JWT token
 */ 
router.post("/", (req, res) => {
  console.log("Processing Request...")
  
  // In a real project we would probably save
  // or query the credentials in our database
  console.log(`User Email: ${req.body.username}`)
  console.log(`User Password: ${req.body.password}`)
  
  const token = jwt.sign({
    id: 1,
    username: `${req.body.username}`,
  }, process.env.KEY, { expiresIn: 60 * 60});
  
  return res.json({"token_data" : token})
});

module.exports = router;