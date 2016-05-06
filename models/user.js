const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);


let Schema  = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length < 20 && v.length > 2;
            },
            message: 'Invalid Name'
        },
        isRequired: true
    },
    surName: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length < 20 && v.length > 2;
            },
            message: 'Invalid surName'
        },
        isRequired: true
    },
    dateOfBirth: {type: Date},
    email: {
        type: String,
        isRequired: true,
        unique: true,
        validate: {
            validator: function (v) {
                let check = /^[\w\d]*[^@]@\w{2,10}.\w{2,3}$/i;
                return v.match(check);
            },
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        isRequired: true
    },
    createdAt: {type: Date, default: new Date()},
    rules : { type: String,
              enum : ['Simple User' , 'Advanced User' , 'Admin'],
              default: 'Simple User'
             }
});


let userModel = mongoose.model('userModel',userSchema);

module.exports =  userModel;
