//allows express to be used
const express = require('express');

// allows cors to be used
const cors = require('cors');

//create a new express application
const app = express();


const Post = require('./post');
const Giphy = require('./giphy');

// allows for json to be read
app.use(express.json()) 
app.use(cors());


app.use(express.static("public"))

//sets homepage to html
app.get('/', (req, res) => {
    const postData = Post.all
    res.send(postData)
});
app.get('/gifs', (req, res) => {
    const gifData = Giphy.all
    res.send(gifData)
});

app.get('/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const selectedPost = Post.findById(postId);
        res.send(selectedPost);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

app.get('/gifs/:id', (req, res) => {
    try {
        const gifId = parseInt(req.params.id);
        const selectedGif = Giphy.findById(gifId);
        res.send(selectedGif);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});


app.post('/new', (req, res) => {
    const data = req.body;
    const newPost = Post.create(data);
    res.status(201).send(newPost);
});

app.post('/gif/new', (req, res) => {
    const data = req.body;
    const newGif = Post.create(data);
    res.status(201).send(newGif);
});

app.delete('/gif/:id', (req, res) => {
    const gifId = parseInt(req.params.id);
    const gifToDestroy = Post.findById(gifId);
    gifToDestroy.destroy();
    res.status(204).send();
});

app.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToDestroy = Post.findById(postId);
    postToDestroy.destroy();
    res.status(204).send();
});


module.exports = app;
