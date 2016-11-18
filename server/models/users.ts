// declare let mongoose: any;
//  // * as mongoose from 'mongoose';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Document = mongoose.Document;

export interface IUser extends Document {
  name: string;
};

export const UserSchema = new Schema({
  name: {type:String, required: true},
});

export const User: any = mongoose.model('User', UserSchema);