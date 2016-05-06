const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-currency').loadType(mongoose);


let Schema  = mongoose.Schema;

let orderSchema  = new Schema({
    userId: { type : String, isRequired : true },
    items: [{
                stockId: {
                type: String,
                validate: {
                    validator: function (v) {
                        return v.length > 2 && v.length < 20;
                    },
                    message: 'Invalid stockId'
                }
             },
             amount : { type : Number , default: 1 , min: 1, max : 9999 }
           }],
    status : {type : String , default: 'pending'}
});

orderSchema.plugin(beautifyUnique);

let orderModel = mongoose.model('orderModel',orderSchema);

module.exports =  orderModel;
