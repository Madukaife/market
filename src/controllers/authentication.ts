// const express = require('express');
import express from 'express';


const {getUserByEmail, createUser} = require('../db/users');
const {random, authentication} = require('../helpers');

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt + authentication.password');
        if (!user) {
            return res.sendStatus(400)
        }
        const expectedHash = authentication(user.authencation.salt, password);
        if (user.authencation.password !== expectedHash) {
            return res.sendStatus(403)
        }
        const salt = random();
        user.authencation.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('OBIORA', user.authencation.sessionToken, { domain: 'localhost', path: '/' });
        return res.sendStatus(200).json(user).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(200);
        }

            const salt = random();
            const user = await createUser({
                username,
                email,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                },      
            });

return res.sendStatus(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);

        
    }
};
