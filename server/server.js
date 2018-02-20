const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const session = require('express-session');
const data = require('./data');
const _ = require('lodash');

app.use(bodyParser.json());
app.use( session({
        secret: 'asdfljasdify2iuehifhgkdkk48&29(92j#@*(Yhklshf5yuq2438u21uithsHFSls9as&*lkHKktq3857128ruwiaghakjsdgh',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
);

app.get('/api/set', (req, res)=>{
    req.session.favorite = req.query.favorite;
    res.send("Thanks for setting your favorite!");
});

app.get('/api/get', (req, res)=>{
    res.send(`${req.session.favorite} is set to your favorite.`);
});

app.get('/api/users', (req, res)=>{
    let filtered = data;
    if (req.query) {
        if (req.query.hair) {
            filtered = filtered.filter(e => e.hairColor === req.query.hair);
        }
        if (req.query.eye) {
            filtered = filtered.filter(e => e.eyeColor = req.query.eye);
        }
        if (req.query.name) {
            filtered = filtered.filter(e => `${e.name.first} ${e.name.last}`.toLowerCase().includes(req.query.name.toLowerCase()));
        }
    }
    res.send(filtered);
});


app.listen(port, ()=>console.log(`Listening on port ${port}`));
