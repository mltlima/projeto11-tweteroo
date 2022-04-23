import express from 'express';
import cors from 'cors';

const usernames =[];
const tweets = [];

const app = express();
app.use(express.json());
app.use(cors()); 


app.post("/sign-up", (req, res) => {
    const body = req.body;
    const username = {
        username: body.username,
        avatar: body.avatar
    };
    usernames.push(username);
    res.send(username);
});

app.post("/tweets", (req, res) => {
    const body = req.body;
    const tweet = {
        username: body.username,
        tweet: body.tweet
    };
    tweets.push(tweet);
    res.send(tweet);
});

app.get("/tweets", (req, res) => {
    //get last ten items in tweets
    const lastTenTweets = tweets.slice(-10);
    res.send(lastTenTweets);
});



app.listen(5000);