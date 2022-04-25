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
    const header = req.headers;

    if (header.user == "" || body.tweet == "") {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        const tweet = {
            username: header.user,
            tweet: body.tweet
        };
        tweets.push(tweet);
        res.status(201).send("OK");
    }
});

app.get("/tweets", (req, res) => {
    const page = req.query.page;
    if(page < 1){res.status(400).send("Informe uma página válida!")};

    const end = (page) * 10;
    const start = (page - 1) * 10;

    const tweetsPage = tweets.slice(start, end);
    if (tweetsPage.length > 0) {
        res.send(tweetsPage);
    }
});

app.get("/tweets/:username", (req, res) => {
    const userTweets = tweets.filter(tweet => tweet.username == req.params.username);
    res.send(userTweets);
});



app.listen(5000);