let mongoose = require('mongoose');

let Schema = mongoose.Schema;

export const HeroSchema = new Schema({
  name: {type:String, required: true},
});

export const Hero: any = mongoose.model('User', HeroSchema);