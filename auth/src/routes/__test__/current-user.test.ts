import request from 'supertest';
import { app } from '../../app';
import { TestsHelper } from '../../test/tests-helper';
import { Routes } from '../routes-constants';

it('responds with details about the current user', async () => {
    const cookie = await TestsHelper.signupAndGetCookie();

    const response = await request(app)
    .get(Routes.CURRENT_USER)
    .set('Cookie', cookie)
    .send()
    .expect(200)
    
    expect(response.body.currentUser.email).toEqual('test@test.com');
});
