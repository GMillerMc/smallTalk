const request = require('supertest');
// import server
const server = require('./app');


describe('API server', () => {
    let api;
    let testPost = {
        id: 12,
        text: 'oh hi there',
    };
    

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5001, () =>
            console.log('Test server running on port 5001')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });


    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /gifs with status 201', (done) => {
        request(api).get('/gifs').expect(200, done);
    });

    
    it('responds to post /new with status 201', (done) => {
        request(api)
            .post('/new')
            .send(testPost)
            .set('Accept', /application\/json/)
            .expect(201)
            .expect({ id: 20, ...testPost }, done);
    });

    it('retrieves a post by id', (done) => {
        request(api)
            .get('/1')
            .expect(200)
            .expect({
                "id": 1,
                "text": "Zelda",
                "react": [0,0,0],
                "comments": [
                "Hi!",
                "hello",
                "hey"]},done);
    });

    it('responds to non existing paths with 404', (done) => {
        request(api).get('/no').expect(404, done);
    });

    it('responds to delete /:id with status 204', async () => {
        await request(api).delete('/1').expect(204);

        const updatedPosts = await request(api).get('/:id');

        expect(updatedPosts.body.length).toBe();
    });

    
});





