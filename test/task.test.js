const request = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('API de Tareas', () => {
    let token;

    before(async() => {
        // Registra un usuario de prueba y obtiene un token
        await request(app)
        .post('/auth/register')
        .send({ email: 'test@example.com', password: '123456' });

        const loginRes = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: '123456' });

        token = loginRes.body.token;
    });
    it('Deberia crear una nueva tarea', async() => {
        const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .set('x-api-key', 'rodo1234')
        .send({ title: 'Tarea de Prueba', description: 'Descripción de la tarea' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title', 'Tarea de Prueba');
    });
})