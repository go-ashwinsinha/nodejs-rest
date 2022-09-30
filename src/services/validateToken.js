const localCache = require('../utils/localCache')


const validateAuthToken = async (req, res, next) => {
    const accessToken = localCache.getValue(process.env.CLIENT_ID)
    if (accessToken) {
        var authheader = req.headers.authorization;
        if (!authheader) {

            res.setHeader('WWW-Authenticate', 'Bearer');
            res.status(400).send("Bearer Tokens Authentication Headers are must!!");
        }

        var tokenProvided = authheader.split(' ')[1]

        // ###!!!!!!!jwt token validation should not be directly compared using string comparison!!!!!

        if (accessToken == tokenProvided) {
            next()
        } else {

            res.setHeader('WWW-Authenticate', 'Bearer');
            res.status(400).send("Token is not valid!!");
        }
    } else {

        res.setHeader('WWW-Authenticate', 'Bearer');
        res.status(400).send("Token expired or not valid!!");
    }
}

module.exports = {
    validateAuthToken
}