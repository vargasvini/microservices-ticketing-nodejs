import mongoose, { Schema } from "mongoose";
import { IUserAttrs, IUserDocument, IUserModel } from "../interfaces/user-interfaces";
import { PasswordService } from "../services/password-service";

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            
        },
        //SAME AS: delete ret.__v;
        versionKey: false
    }
});

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashedPass = await PasswordService.toHash(this.get('password'));
        this.set('password', hashedPass);
    }
    
    done();
});

userSchema.statics.build = (attrs: IUserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };