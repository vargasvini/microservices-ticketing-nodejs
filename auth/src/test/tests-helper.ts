import request from 'supertest';
import { app } from "../app";
import { Routes } from "../routes/routes-constants";

export abstract class TestsHelper {
    static async signupAndGetCookie(){
        const email = 'test@test.com';
        const password = 'password';

        const response = await request(app)
        .post(Routes.SIGN_UP)
        .send({
            email,
            password
        })
        .expect(201)

        return response.get('Set-Cookie');
    }
}