const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('config');
const CredentialService = require('./services/credential_service');
const UserService = require('./services/user_service');


const CredentialDAO = require('./dao/credential_dao');

const credential_dao = new CredentialDAO();
const credential_service = new CredentialService();
const user_service = new UserService();

const cookie_key = config.get("cookie");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const jwtKey = config.get("jwtKey");
const port = 8080;
const expTokenTime = 3 * 60;

function verifyToken(token) {
    if (!token)
        return undefined;
    
    let payload;
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return undefined;
        }
    }
    return payload;
}

app.get("/login", function(req, res) {
    return res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get("/user", async function(req, res) {
    const token = req.cookies[cookie_key];
    let payload = verifyToken(token);
    if (!payload) {
        res.status(401);
        res.send();
        return;
    }
    const login = await credential_service.get_login_by_user(payload.id);
    const user = await user_service.get_user_by_id(payload.id);
    user.login = login;
    return res.json({user});
});

app.get("/home", function(req, res) {
    let token = req.cookies[cookie_key];
    let payload = verifyToken(token);
    if (!payload) {
        return res.sendFile(path.join(__dirname + '/client/index.html'));
    }
    return res.sendFile(path.join(__dirname+'/client/home.html'));
});

app.get("/registration", function(req, res) {
    return res.sendFile(path.join(__dirname + '/client/registration.html'));
});

app.post("/registration", async function(req, res) {
    const created_user_id = await user_service.add_user(req.body);
    if (created_user_id) {
        const token = jwt.sign({ id: created_user_id }, jwtKey, {
            algorithm:"HS256",
            expiresIn: expTokenTime,
        });
        res.header('Set-Cookie', `${cookie_key}=${token}; HttpOnly`);
        res.send();
        return;
    }
    res.status(401);
    res.send();
});

app.post("/login", async function(req, res) {
    const cred = await credential_dao.get_user_id_by_credential(req.body);
    if (cred) {
        const token = jwt.sign({ id: cred }, jwtKey, {
            algorithm: "HS256",
            expiresIn: expTokenTime,
        })
        res.header('Set-Cookie', `${cookie_key}=${token}; HttpOnly`);
        res.send();
        return;
    }

    res.status(401);
    res.send();
});

app.get("/logout", function(req, res) {
    if (verifyToken(req.cookies[cookie_key])) {
        res.header('Set-Cookie', `${cookie_key}=; HttpOnly`);
    }
    res.redirect("/home");
});

app.get("/edit", function(req, res) {
    if (verifyToken(req.cookies[cookie_key])) {
        return res.sendFile(path.join(__dirname+'/client/edition.html'));
    }
    return res.sendFile(path.join(__dirname+'/client/index.html'));
});

app.patch("/edit", async function(req, res) {
    const payload = verifyToken(req.cookies[cookie_key]);
    if (payload) {
        req.body.id = payload.id;
        if (await user_service.update_user(req.body)) {
            return res.status(200).send();
        } else {
            return res.status(400).send();
        }
    }
    return res.status(401).send();
});

app.listen(port);
