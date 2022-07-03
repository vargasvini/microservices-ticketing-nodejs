import mongoose from "mongoose";

// An interface that describes the porperties
// that are required to create a new User
interface IUserAttrs {
    email: string,
    password: string,
}

// An interface that describes the properties
// that a User Document has
interface IUserDocument extends mongoose.Document{
    email: string,
    password: string
}

// An interface that describes the properties
// that a User Model has
interface IUserModel extends mongoose.Model<IUserDocument>{
    build(attrs: IUserAttrs): IUserDocument;
}

interface IUserPayload {
    id: string,
    email: string
}


export { IUserAttrs, IUserModel, IUserDocument, IUserPayload };