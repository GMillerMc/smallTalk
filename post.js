const postData = [
    { id: 1, text: 'Zelda', react: ":)", comments: "Hi!" },
    { id: 1, text: 'Something', react: ":)", comments: "Hi!" },
    { id: 1, text: 'another thing', react: ":)", comments: "Hi!" },
];


class Post {
    constructor(data) {
        this.id = data.id;
        this.text = data.text;
        this.react = data.react;
        this.comments = data.comments
    }

    static get all() {
        const anonPost = postData.map((post) => new Post(post));
        return anonPost;
    }

    static findById(id) {
        try {
            const postData = postData.filter((post) => post.id === id)[0];
            const post = new Post(postData);
            return post;
        } catch (err) {
            throw new Error('That post does not exist!');
        }
    }

    static create(post) {
        const newPostId = postData.length + 1;
        const newPost = new Post({ id: newPostId, ...post });
        postData.push(newPost);
        return newPost;
    }

    destroy() {
        const post = postData.filter((post) => post.id === this.id)[0];
        postData.splice(postData.indexOf(post), 1);
    }
}

module.exports = Post, postData;