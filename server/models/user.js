'use strict';
const mongoose = require(`mongoose`);
require(`mongoose-currency`).loadType(mongoose);


const Schema = mongoose.Schema;

const userSchema = new Schema({
  name : {
    type : String,
    validate : {
      validator : function (v) {
        return v.length < 20 && v.length > 2;
      },
      message : `Invalid Name`
    },
    isRequired : true
  },
  surName : {
    type : String,
    validate : {
      validator : function (v) {
        return v.length < 20 && v.length > 2;
      },
      message : `Invalid surName`
    },
    isRequired : true
  },
  dateOfBirth : { type : Date },
  email : {
    type : String,
    isRequired : true,
    unique : true
  },
  password : {
    type : String,
    isRequired : true
  },
  createdAt : { type : Date, default : new Date() },
  rules : {
    type : String,
    enum : [`Simple`, `Advanced`, `Admin`],
    default : `Simple`
  },
  sendOrders : { type : Number, min : 0, default : 0 },
  ownCars : { type : Array, default : [], unique : true }
});


const userModel = mongoose.model(`userModel`, userSchema);

module.exports = userModel;
