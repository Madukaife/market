// const express = require('express');
import express from 'express';



const { register, login } = require('../controllers/authentication');
export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login)
};
 