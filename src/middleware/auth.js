const localCache = require('../utils/localCache')
const { logger } = require('../utils/logger')
const jwt = require("jsonwebtoken")

/**
 * PUSH Notifcation event processor
 * @param {*} req - express req object
 * @param {*} res - express res object
 */
module.exports.authController = async (req, res) => {
    try {
        // Get user input
        //const { clientId, clientSecret } = req.body;
        var authheader = req.headers.authorization;
        if (!authheader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status(400).send("Authentication Headers are must!!");
        }

        var auth = new Buffer.from(authheader.split(' ')[1],
            'base64').toString().split(':');
        var ClientID = auth[0];
        var ClientSecret = auth[1];


        // Validate user input
        if (!(ClientID && ClientSecret)) {
            res.status(400).send("Authentication Headers are required");
        }
        // Validate if user exist in our database
        //const user = await User.findOne({ email });

        if (ClientID == process.env.CLIENT_ID && ClientSecret == process.env.CLIENT_SECRET) {
            // Create a new token with the username in the payload
            // and which expires 300 seconds after issue
            const token = jwt.sign({ ClientID }, process.env.JWT_KEY, {
                algorithm: "HS256",
                expiresIn: process.env.JWT_EXPIRY_SECONDS,
            })
            localCache.setValue(
                ClientID,
                token,
                process.env.JWT_EXPIRY_SECONDS
            )

            var message = {
                "Client Id": ClientID,
                "token": token
            }

            // user
            res.status(200).send(message);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        logger.error('' + err)
        res.status(500).send({ message: 'Internal Error' })
    }
}