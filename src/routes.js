const Validator = require('express-json-validator-middleware').Validator
const router = require('express').Router()
const { authController } = require('./middleware/auth')
const { validateAuthToken } = require('./services/validateToken')

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
    '/addUser', validate({ body: }),
	validate({ body: jasperSliceActivateSchema }),
    validateAuthToken,
    sliceActivationParamMapping
	


var jasperSliceActivateSchema = JSON.parse(fs.readFileSync('jasperSliceActivateSchema.json', 'utf8'));

//activate slice
router.post(
    '/service/updateServiceOrder/v1/', validate({ body: jasperSliceActivateSchema }),
    validateAuthToken,
    sliceActivationParamMapping
)


//graceful polling -------> THIS IS UNDER DEVELOPMENT, PLEASE DONT HIT THIS ENDPOINT
router.post(
    '/service/getSliceOrderStatus/v1/', validate({ body: jasperSliceActivateSchema }),
 //   validateAuthToken,
   // sliceActivationParamMapping
)


//delete to be decided on its process.... 



module.exports = router

