const User = require('../models/user');
const Cars = require('../models/carsItem');
const Orders = require('../models/order');

module.exports = {

    getAllUsers: (req, res, next) => {
        User.find({}, {_id: 1, dateOfBirth: 1, name: 1, email: 1})
            .then((data) => {
                res.json(data)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    },

    deleteUser: (req, res, next) => {
        let userId = req.body.userId;
        if (!userId) {
            next(new Error('User Id required'))
        }
        User.remove({_id: userId}, (err, removedUser) => {
            if (err) next(new Error(err))
            res.send('Deleted!')
        })

    },

    viewTopCars: (req, res, next) => {
        Cars.find()
            .sort({bought: -1})
            .limit(5)
            .then((data) => {
                res.json(data)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    },

    viewTopUsers: (req, res, next) => {
        User.find()
            .sort({sendOrders: -1})
            .limit(5)
            .then((data) => {
                res.json(data)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    },

    viewLastWeekOrders: (req, res, next) => {
        Orders.find()
            .then((data) => {
                Date.prototype.getWeek = function () {
                    let onejan = new Date(this.getFullYear(), 0, 1);
                    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
                };

                let weekNumber = (new Date()).getWeek();

                let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let result = [];

                dayNames.forEach((day) => {
                    let count = 0;
                    data.forEach((order) => {
                        if (order.createdAt.getWeek() + 1 >= weekNumber) {
                            if (day === dayNames[order.createdAt.getDay()]) {
                               count ++
                            }
                        }
                    });
                    result.push(day+' ' + count)
                });

                return result
            })
            .then((resultTotal) => {
                res.json(resultTotal)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    },

};