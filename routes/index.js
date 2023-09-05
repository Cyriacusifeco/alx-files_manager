import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
// const UserController = require('../controllers/UsersController');
// const AuthController = require('../controllers/AuthController');
// const express = require('express');

const router = express.Router();
// const AppController = require('../controllers/AppController');

// Define the API endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', AuthController.getMe);
router.post('/files', FilesController.postUpload);
router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);
// Define the POST /users route
router.post('/users', UsersController.postNew);

module.exports = router;
