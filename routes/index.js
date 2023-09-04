const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
import UsersController from '../controllers/UsersController';

// Define the API endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Define the POST /users route
router.post('/users', UsersController.postNew);

module.exports = router;
