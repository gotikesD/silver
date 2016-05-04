const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);


let Schema  = mongoose.Schema;

let orderSchema  = new Schema({
    userId: { type : String, isRequired : true },
    items: { type : Array , default : []},
    status : {type : String , default: 'pending'}
});

let orderModel = mongoose.model('orderModel',orderSchema);

module.exports =  orderModel;
