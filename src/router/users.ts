import express from 'express';
const { getAllUsers, deleteUser, updateUser } = require('../controllers/users');
const {isAuthenticated, isOwner} = require('../middlewares')

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);

} 