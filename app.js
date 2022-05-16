//allows express to be used
const express = require('express');

// allows cors to be used
const cors = require('cors');

//create a new express application
const app = express();
const Post = require('./post')

// allows for json to be read
app.use(express.json()) 
app.use(cors());


app.use(express.static("public"))

//sets homepage to html
app.get('/', (req, res) => {
    const postData = Post.all
    res.send(postData)
});

//

module.exports = app;
