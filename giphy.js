const gifData= [
    {id:1, url: ""},
    {id:2, url: ""},
    {id:3, url: ""},
]


class Giphy {
    constructor(data) {
        this.id = data.id;
        this.url = data.url;
    }

    static get all() {
        const giphyUrl = gifData.map((giphy) => new Giphy(giphy));
        return giphyUrl;
    }

    static findById(id) {
        try {
            const gifsData = gifData.filter((giphy) => giphy.id === id)[0];
            const gifs = new Giphy(gifsData);
            return gifs;
        } catch (err) {
            throw new Error('That gif does not exist!');
        }
    }

    static create(giphy) {
        const newGifId = gifData.length + 1;
        const newGif = new Giphy({ id: newGifId, ...giphy });
        gifData.push(newGif);
        return newGif;
    }

    destroy() {
        const giphy = gifData.filter((giphy) => giphy.id === this.id)[0];
        gifData.splice(gifData.indexOf(giphy), 1);
    }
}

module.exports = Giphy, gifData;