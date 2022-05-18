const request = require('supertest');
// import server
const server = require('./app');

describe('API server', () => {
    let api;

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

    test('Gives 204 when trying to remove a post', (done) =>{
		request(api)
			.delete('/:id')
			.expect(204, done)
	})
//not working//

	
	it('responds to post with status 201', (done)=>{
		const postData = {
			id: "",
			text: ""
		}

		request(api)
			.post('/new')
			.send(postData)
			.expect(201)
			.expect({...postData,}, done) 
	})
});
