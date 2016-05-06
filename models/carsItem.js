const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

let Currency = mongoose.Types.Currency;

let Schema = mongoose.Schema;

let carItemSchema = new Schema({
    stockId: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 2 && v.length < 20;
            },
            message: 'Invalid stockId'
        },
        unique: true
    },
    VINCode: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length == 17;
            },
            message: 'Invalid VinCode'
        }
    },
    available: {type: Boolean},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    make: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length > 0 && v.length < 20;
            },
            message: 'Invalid make'
        }
    },
    model: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length < 20;
            },
            message: 'Invalid model'
        }
    },
    color: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length < 20;
            },
            message: 'Invalid color'
        }
    },
    retailPrice: {type: Currency, min: 0 , default : 0},
    askPrice: {type: Currency, min: 0 , default : 0},
    internationalPrice: {type: Currency, min: 0 , default : 0},
    year: {type: Number, min: new Date().getFullYear() - 50, max: new Date().getFullYear()},
    mileage: {type: Number, min: 0},
    carState: {type: String, enum: ['New', 'Used']},
    transmissionType: {type: String, enum: ['Automatic', 'Manual']},
    entryDate: {type: Date},
    cost: {type: Currency, min: 0},
    dealerId: {type: Number},
    amount: {type: Number, min: 1, default: 1},
    userId:{ type : String,
            validate: {
            validator: function (v) {
                return v.length < 30;
            },
            message: 'Invalid owner ID'
                },
            default : '0'
            }
});

carItemSchema.index({stockId: 1}, {unique: true});

let carItemModel = mongoose.model('carItemModel', carItemSchema);

module.exports = carItemModel;