const request = require('supertest')
const app = require('../src/app')

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Jack Collins',
        email: 'jack@example.com',
        password: 'feedmePLS1234!'
    }).expect(201)
})