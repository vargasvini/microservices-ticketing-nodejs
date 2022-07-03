import request from 'supertest';
import { app } from '../../app';
import { Routes } from '../routes-constants';


it('returns a 201 on successful signup', async () => {
    return await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);       
});

it('returns a 400 on unsuccessful signup with invalid email', async () => {
    return await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'testtest.com',
            password: 'ssdasdsaddggs'
        })
        .expect(400);       
});

it('returns a 400 on unsuccessful signup with password short than 4 or greater than 20 digits ', async () => {
    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'sds'
        })
        .expect(400);       
    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'sdsadsadsadassasadsadsdsadsaasdas'
        })
        .expect(400);   
});

it('returns a 400 on unsuccessful signup with missing email or password', async () => {
    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'teste@teste.com'
        })
        .expect(400);       
    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            password: 'sadadaddasdas'
        })
        .expect(400);   
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'asdasd'
        })
        .expect(201);

    await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'asdasd'
        })
        .expect(400);   
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email: 'test@test.com',
            password: 'asdasd'
        })
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
    expect(response.headers['set-cookie']).toBeDefined();
    
});