const Validator = require('express-json-validator-middleware').Validator
const router = require('express').Router()
const { authController } = require('./middleware/auth')
const { validateAuthToken } = require('./services/validateToken')
const { addUserDbHelper } = require('./services/addUserDbHelper')


const { name, version } = require('../package.json')

router.get('/', (req, res) => {
    const env = process.env.NODE_ENV
    //const message = { name, version, env };
    
    const message = {
        "name": name,
        "version": version,
        "env": env
    }
    console.log(message)
    res.status(200).send(message)
})

router.get(
    '/dev/token',
    authController
)


var fs = require('fs');
var addUserSchema = JSON.parse(fs.readFileSync('addUserSchema.json', 'utf8'));

const { validate } = new Validator();

//create slice
router.post(
    '/addUser/', validate({ body: addUserSchema}),
    validateAuthToken,
    addUserDbHelper
    )

var jasperSliceActivateSchema = JSON.parse(fs.readFileSync('jasperSliceActivateSchema.json', 'utf8'));

//update user
router.post(
    '/updateUser/{userId}', validate({ body: updateUserSchema }),
    validateAuthToken
)


//delete user
router.post(
    '/deleteUser/{userId}', validate({ body: deleteUserSchema }),
    validateAuthToken
)

//get user
router.get(
    '/getUser/{userId}',
    validateAuthToken
)

//list all users
router.get(
    '/getUsers/',
    validateAuthToken
)

module.exports = router

