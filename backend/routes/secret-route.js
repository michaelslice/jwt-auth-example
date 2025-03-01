/* 

Validate the JWT token, and render a page

*/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Validate the client provided JWT token
 * and render the secret page to them
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 */
router.get("/", (req, res) => {
    const authHeader = req.headers["authorization"]; 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ "Error": "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    const key = process.env.KEY
    console.log("Secret key:", key);

    try {
        const decoded = jwt.verify(token, key)        

        console.log("Decoded JWT:", decoded); 
        return res.sendFile('secret.html', { root: "./views" });
    } 
    catch (error) {
        return res.status(401).json({ "Error": "Invalid or expired token" });
    }
});

module.exports = router;