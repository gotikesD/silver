'use strict';
const mongoose = require(`mongoose`);
require(`mongoose-currency`).loadType(mongoose);


const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId : { type : String, isRequired : true },
  items : [{
    stockId : {
      type : String,
      validate : {
        validator : function (v) {
          return v.length > 2 && v.length < 20;
        },
        message : `Invalid stockId`
      }
    },
    amount : { type : Number, default : 1, min : 1, max : 9999 }
  }],
  status : { type : String, default : `pending` },
  createdAt : { type : Date, default : new Date() }
});


const orderModel = mongoose.model(`orderModel`, orderSchema);

module.exports = orderModel;
