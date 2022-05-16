//allows express to be used
const express = require('express');

// allows cors to be used
const cors = require('cors');

//create a new express application
const app = express();


const Post = require('../smallTalk_Server/post');

// allows for json to be read
app.use(express.json()) 
app.use(cors());


app.use(express.static("public"))

//sets homepage to html
app.get('/', (req, res) => {
    const postData = Post.all
    res.send(postData)
});

app.get('/:id', (req, res) => {
    res.send ("hello")  
});

app.post('/new', (req, res) => {
    const data = req.body;
    const newPost = Post.create(data);
    res.status(201).send(newPost);
});

app.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToDestroy = Post.findById(postId);
    postToDestroy.destroy();
    res.status(204).send();
});


module.exports = app;
