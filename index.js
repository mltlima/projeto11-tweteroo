import express from 'express';
import cors from 'cors';

const usernames =[];
const tweets = [];

const app = express();
app.use(express.json());
app.use(cors()); 


app.post("/sign-up", (req, res) => {
    const body = req.body;

    if(body.username == "" || body.avatar == ""){
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        const username = {
            username: body.username,
            avatar: body.avatar
        };
        usernames.push(username);
        res.status(201).send("OK");
    }
});

app.post("/tweets", (req, res) => {
    const body = req.body;

    if (body.username == "" || body.tweet == "") {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        const tweet = {
            username: body.username,
            tweet: body.tweet
        };
        tweets.push(tweet);
        res.status(201).send("OK");
    }
});

app.get("/tweets", (req, res) => {
    //get last ten items in tweets
    const lastTenTweets = tweets.slice(-10);
    res.send(lastTenTweets);
});

app.get("/tweets/:username", (req, res) => {
    const userTweets = tweets.filter(tweet => tweet.username == req.params.username);
    res.send(userTweets);
});



app.listen(5000);