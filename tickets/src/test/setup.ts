import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// declare global {
//   var signin: () => Promise<string[]>;
// }

let mongo: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY ='ASDDSDF';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () =>{
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});