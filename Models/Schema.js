const  mongoose  = require("mongoose");
const Schema = new mongoose.Schema({
    name:{type:String, required:true,trim:true},
    gmail:{type:String,required:true, trim:true, unique:true},
    password:{type:String ,required:true,trim:true},
    confirmPassword:{type:String ,required:true,trim:true},
    gender:{type:String ,required:true,trim:true},
});

const model = new mongoose.model("merndata",Schema);   
module.exports = model;