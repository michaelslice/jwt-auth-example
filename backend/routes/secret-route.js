/* 

Validate the JWT token, and render a page

*/
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Validate the client provided JWT token
 * and send the HTML page to the client side
 * 
 * @param req: Request object
 * @param res: Response object
 * 
 * @return JSON object with a HTML file
 */
router.get("/", (req, res) => {
    const authHeader = req.headers["authorization"]; 

    // Check if the user sent the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ "Error": "Token not provided" });
    }

    // Process the client JWT, and get the stored secret key
    const token = authHeader.split(" ")[1];
    const key = process.env.KEY
    console.log("Secret key:", key);

    try {
        // Verify JWT, to see if tampered with
        const decoded = jwt.verify(token, key)        

        // If valid send client a HTML file
        console.log("Decoded JWT:", decoded); 
        return res.sendFile('secret.html', { root: "./views" });
    } 
    catch (error) {
        return res.status(401).json({ "Error": "Invalid or expired token" });
    }
});

module.exports = router;