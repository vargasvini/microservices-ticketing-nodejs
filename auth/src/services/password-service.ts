import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordService{
    static async toHash(password:string){
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedPassowrd: string, suppliedPassword: string){
        const [hashadPassword, salt] = storedPassowrd.split('.');
        const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashadPassword;
    }
}