// const express = require('express');
import express from 'express';

const authencation = require('./authentication');
const users = require('./users');

const router = express.Router();

export default (): express.Router => {
    authencation(router);
    users(router);
    
    return router;
}