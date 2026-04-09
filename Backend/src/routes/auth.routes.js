const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * 
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public 
 */
authRouter.post('/register',authController.registerUserController);

/**
 * 
 * @route POST api/auth/login   
 * @description login a user with email and password
 * @access Public 
 */
authRouter.post('/login',authController.loginUserController);


/**
 * 
 * @route GET api/auth/logout
 * @description logout a user by blacklisting the token
 * @access Public 
 */
authRouter.get('/logout',authController.logoutUserController);


/** * 
 * @route GET api/auth/get-user
 * @description get the details of the logged in user
 * @access Private 
 */
authRouter.get('/get-user',authMiddleware.authUser,authController.getUserController)

module.exports = authRouter;