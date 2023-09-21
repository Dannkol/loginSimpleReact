import express from 'express';
import cors from "cors";
import jwt from 'jsonwebtoken'
import passport from "passport"
import  BearerStrategy  from "passport-http-bearer"
import { mongoConn, getDB } from '../db/conecction.js';

const app = express();

app.use(cors())
app.use(express.json()); // Para manejar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para manejar solicitudes URL-encoded

async function generateAccessToken (data) {
    const client = await mongoConn()
    try {
        console.log(data);
        const db = getDB('pruebaReact');
        const coll = db.collection('users');

        const query = await coll.findOne({ $and : [
            {password: data.password},
            {username : data.username}
        ] }, {})

        if (query) {

            return jwt.sign(query, "582asd38asd5asfdawdfaewfewgewwasfe2e21", { expiresIn: '1800s' });
        } else {
            return fasle
        }
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

}


passport.use(new BearerStrategy(
    function (token, done) {
        if (token == null) return res.status(401).json({ error: 'Invalid token' });

        jwt.verify(token, "582asd38asd5asfdawdfaewfewgewwasfe2e21", (err, user) => {
            console.log(err)

            if (err) return done(err);

            return done(null, user, { scope: 'all' });
        })

    }
)); 

app.use(passport.initialize());

app.post('/api/login', async function (req, res) {
    console.log(req.body);
    const token = await generateAccessToken(req.body);
    console.log(token);
    res.json({
        token: token
    });
});

app.get('/api/user',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json(req.user);
    });


app.listen(5101, (err, res) => {
    console.log('listening on http://192.168.129.72:5101');
})